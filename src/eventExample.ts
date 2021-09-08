import * as utils from '@dcl/ecs-scene-utils'
import { VideoSystem } from './VideoSystem'

export function test(videoTexture: VideoTexture) {
    let flag = true
    let counter = 0

    const testEntity = new Entity()
    testEntity.addComponent(
        new utils.Interval(5000, () => {
            flag = !flag
            if (flag){
                videoTexture.play()
                videoTexture.seekTime(7.0)
                log('Video play has been emitted to the renderer')

                counter += 1
                if (counter === 4){
                    counter = 0
                }
            }else{
                videoTexture.pause()
                log('Video PAUSE has been emitted to the renderer')
            }
        })
    )

    engine.addEntity(testEntity)
    onVideoEvent.add((data) => {
        // log("VideoEvent :", videoTexture)
        // log("onVideoEvent::data :", data)
    })  

    engine.addSystem(new VideoSystem(videoTexture))
}
