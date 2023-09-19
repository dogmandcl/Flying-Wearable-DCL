import { InputAction, MeshCollider, MeshRenderer, PointerEventType, Transform, engine, inputSystem } from "@dcl/sdk/ecs"
import { Vector3, Quaternion } from "@dcl/sdk/math"

let inTrigger = false

export function createElevator(){
    const plat = engine.addEntity()
    const plat1 = engine.addEntity()
    const plat2 = engine.addEntity()
    const plat3 = engine.addEntity()
    const plat4 = engine.addEntity()

    Transform.create(plat, {
        position: Vector3.create(0, .1, 0),
        scale: Vector3.create(2, 2, 1),
        rotation: Quaternion.fromEulerDegrees(90, 90, 0)
    })
    // MeshRenderer.setPlane(plat)
    MeshCollider.setPlane(plat)


    Transform.create(plat1, {
        position: Vector3.create(.5, 0, 0),
        scale: Vector3.create(5, 2, 4),
        rotation: Quaternion.fromEulerDegrees(0, 90, 0),
        parent: plat
    })
    // MeshRenderer.setPlane(plat1)
    MeshCollider.setPlane(plat1)


    Transform.create(plat2, {
        position: Vector3.create(-.5, 0, 0),
        scale: Vector3.create(5, 2, 4),
        rotation: Quaternion.fromEulerDegrees(0, 90, 0),
        parent: plat
    })
    // MeshRenderer.setPlane(plat2)
    MeshCollider.setPlane(plat2)

    Transform.create(plat3, {
        position: Vector3.create(0, .5, 0),
        scale: Vector3.create(2, 5, 4),
        rotation: Quaternion.fromEulerDegrees(90, 0, 0),
        parent: plat
    })
    // MeshRenderer.setPlane(plat3)
    MeshCollider.setPlane(plat3)



    Transform.create(plat4, {
        position: Vector3.create(0, -.5, 0),
        scale: Vector3.create(2, 5, 4),
        rotation: Quaternion.fromEulerDegrees(90, 0, 0),
        parent: plat
    })
    // MeshRenderer.setPlane(plat4)
    MeshCollider.setPlane(plat4)



    if (!Transform.has(engine.PlayerEntity)) return
    const transform = Transform.getMutable(plat)
    transform.position = Transform.get(engine.PlayerEntity).position
    transform.position.y = Transform.get(engine.PlayerEntity).position.y -.5



    function SimpleMove() {
        let transform = Transform.getMutable(plat)
        if (inTrigger) {
            transform.position = Vector3.add(Vector3.scale(Vector3.Forward(), 0.2), transform.position)
        }
        else {
            Reset


        }
    }

    function Reset() {
        const mutableTransform = Transform.getMutable(plat)
        mutableTransform.position = { x: 0, y: 0, z: 0 }

    }


    engine.addSystem(() => {
        const cmd = inputSystem.getInputCommand(
          InputAction.IA_JUMP,
          PointerEventType.PET_DOWN,
        )
        if (cmd) {
          inTrigger = true
          console.log(inTrigger)
        }
      })

      engine.addSystem(() => {
        const cmd = inputSystem.getInputCommand(
          InputAction.IA_JUMP,
          PointerEventType.PET_UP,
        )
        if (cmd) {
          inTrigger = false
          console.log(inTrigger)
        }
      })



      engine.addSystem(SimpleMove)
}