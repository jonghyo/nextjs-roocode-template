import { type Preview, type Decorator } from '@storybook/react'
import React from 'react'

import '../src/app/globals.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [(Story) => React.createElement(Story)] as Decorator[]
}

export default preview
