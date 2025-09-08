import '@testing-library/jest-dom/vitest'
import { beforeEach } from 'vitest'

import { faker } from './shared/services/Faker'

beforeEach((p) => {
  const fakerSeed = Math.floor(Math.random() * (10000 - 0 + 1)) + 0

  faker.seed(fakerSeed)

  p.onTestFailed(() => {
    console.log(
      `Logs for task: "${p.task.name}"`,
      `Data was generated using FakerSeed: ${fakerSeed}. FakerSeed allows you to reproduce the generated data for local debugging.`,
      // TODO: add red-stack testing docs link
      'Instructions: ',
    )
  })
})
