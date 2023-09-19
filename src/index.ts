import { engine } from '@dcl/sdk/ecs'

import { bounceScalingSystem, circularSystem } from './systems'
import { setupUi } from './ui'
import { createElevator } from './elevator'

// Defining behavior. See `src/systems.ts` file.
engine.addSystem(circularSystem)
engine.addSystem(bounceScalingSystem)

export function main() {
  // draw UI
  setupUi()
  createElevator()

}
