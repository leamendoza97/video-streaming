export class VideoSystem implements ISystem {
    videoTexture: VideoTexture
    elapsedTime: number
    lastVideoEventTick: number
    lastVideoEventData: IEvents['videoEvent']
    offsetPosition: number

    constructor(_videoTexture: VideoTexture) { 
        this.videoTexture = _videoTexture
        this.elapsedTime = 0
        this.lastVideoEventTick = 0
        this.offsetPosition = -1

        onVideoEvent.add((data) => {
            if (data.videoClipId == this.videoTexture.videoClipId){
                this.updateEvent(data)
            }
        })
    }
    
    update(dt: number) {
        this.elapsedTime += dt
        if (this.lastVideoEventData.videoStatus === VideoStatus.PLAYING){
            this.offsetPosition += dt
            log('Playing video - currentOffset: ', this.offsetPosition)
        }
    }

    protected onChangeStatus(oldStatus, newStatus) {

    }

    protected onOffsetUpdate() {

    }

    private updateEvent(event: IEvents['videoEvent']){
        log('VideoEvent in VideoSystem:', event)
        if (this.lastVideoEventTick != 0.0) {
            if (this.lastVideoEventData.videoStatus === undefined || 
                this.lastVideoEventData.videoStatus !== event.videoStatus){
                if (event.videoStatus === VideoStatus.PLAYING){
                    this.offsetPosition = event.currentOffset
                }

                this.onChangeStatus(this.lastVideoEventData.videoStatus || VideoStatus.NONE, event.videoStatus)
            }
        }
        
        this.lastVideoEventData = event
        this.lastVideoEventTick = this.elapsedTime
    }
}