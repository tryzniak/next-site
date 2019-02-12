import React from 'react'
import { Keyframes, Frame } from 'react-keyframes'

import Window from './window'
import Prompt from './prompt'
import Caret from './caret'

import { FONT_FAMILY_MONO } from '../../css-config'

// simplify frames data and only stores deltas
function generateFrames(onRender) {
  const frames = []
  const current = []
  let duration = 0

  const data = [
    {
      duration: 500,
      0: <Prompt />,
      1: <Caret />
    },
    {
      duration: 50,
      1: 'n',
      2: <Caret />
    },
    {
      duration: 50,
      1: 'ne',
      2: <Caret />
    },
    {
      duration: 50,
      1: 'nex',
      2: <Caret />
    },
    {
      duration: 50,
      1: 'next',
      2: <Caret />
    },
    {
      duration: 50,
      1: 'next ',
      2: <Caret />
    },
    {
      duration: 50,
      1: 'next b',
      2: <Caret />
    },
    {
      duration: 50,
      1: 'next bu',
      2: <Caret />
    },
    {
      duration: 50,
      1: 'next bui',
      2: <Caret />
    },
    {
      duration: 50,
      1: 'next buil',
      2: <Caret />
    },
    {
      duration: 300,
      1: 'next build'
    },
    {
      duration: 850,
      1: (
        <>
          next build
          <br />
          <span>[12:43:18 PM] Compiling client</span>
          <br />
          <span>[12:43:18 PM] Compiling server</span>
          <br />
        </>
      )
    },
    {
      duration: 850,
      1: (
        <>
          next build
          <br />
          <span>[12:43:18 PM] Compiling client</span>
          <br />
          <span>[12:43:18 PM] Compiling server</span>
          <br />
          <span className="bold">
            <span role="img" aria-label="star">
              ✨
            </span>{' '}
            Done in 6.89s
          </span>
          <br />
          <br />
        </>
      ),
      2: <Prompt />,
      3: <Caret />
    },
    {
      duration: 50,
      3: null,
      4: 'n',
      5: <Caret />
    },
    {
      duration: 50,
      4: 'ne',
      5: <Caret />
    },
    {
      duration: 50,
      4: 'nex',
      5: <Caret />
    },
    {
      duration: 50,
      4: 'next',
      5: <Caret />
    },
    {
      duration: 50,
      4: 'next ',
      5: <Caret />
    },
    {
      duration: 50,
      4: 'next e',
      5: <Caret />
    },
    {
      duration: 50,
      4: 'next ex',
      5: <Caret />
    },
    {
      duration: 50,
      4: 'next exp',
      5: <Caret />
    },
    {
      duration: 50,
      4: 'next expo',
      5: <Caret />
    },
    {
      duration: 50,
      4: 'next expor',
      5: <Caret />
    },
    {
      duration: 300,
      4: 'next export'
    },
    {
      duration: 850,
      4: (
        <>
          next export
          <br />
          ...
        </>
      ),
      5: null
      // 6: <Caret />,
    },
    {
      duration: 850,
      5: (
        <>
          <br />> exporting path: /about
          <br />> exporting path: /dashboard
          <br />> exporting path: /index
          <br />> exporting path: /<br />
        </>
      )
    },
    {
      duration: 850,
      showResult: true,
      6: (
        <>
          <span className="bold">
            <span role="img" aria-label="star">
              ✨
            </span>{' '}
            Done in 0.79s
          </span>
          <br />
        </>
      )
      // 7: <Prompt />,
      // 8: <Caret />,
    }
  ]

  let showResult

  for (let i = 0; i < data.length; ++i) {
    for (const line in data[i]) {
      if (line === 'duration') {
        duration = data[i][line]
      } else if (line === 'showResult') {
        showResult = true
      } else {
        current[line] = data[i][line]
      }
    }

    frames.push(
      <Frame duration={duration} key={i} onRender={showResult && onRender}>
        {[...current]}
      </Frame>
    )
  }

  return frames
}

export default class Console extends React.PureComponent {
  render() {
    const { running, showResult } = this.props

    const classes = ['console']

    return (
      <Window
        title={null}
        height={275}
        mobileHeight={275}
        backgroundColor="black"
      >
        <div className={classes.join(' ')}>
          {running && (
            <Keyframes component="pre">{generateFrames(showResult)}</Keyframes>
          )}
          <style>
            {`
            pre {
              font-size: 13px;
              font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
              line-height: 17px;
              margin: 0;
              white-space: pre;
            }
            .highlight {
              color: #00FFFF;
            }
            .bold {
              font-weight: 600;
            }
            .dim {
              opacity: 0.5;
            }
          `}
          </style>
        </div>
        <style jsx>
          {`
            .console {
              color: #fff;
              font-size: 12px;
              font-family: ${FONT_FAMILY_MONO};
              line-height: 24px;
              margin: 0 16px;
              text-align: left;
            }
            .console i {
              font-style: normal;
              color: #04ecc5;
            }
          `}
        </style>
      </Window>
    )
  }
}
