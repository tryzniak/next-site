import Link from 'next/link'
import { MDXProvider } from '@mdx-js/tag'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import formatDate from 'date-fns/format'

import Header from '../header'
import Footer from '../footer'
import Navbar from '../navbar'
import Page from '../page'
import Container from '../container'
import Button from '../button'
import { MediaQueryConsumer } from '../media-query'
import { components } from './post-components'
import SocialMeta from '../social-meta'
import ArrowLeftLong from '../icons/arrow-left-long'

const Author = meta => (
  <div className="author">
    <img src={meta.avatar} alt={meta.name} />
    <span className="name f5">
      <span className="real-name">{meta.name}</span>
      <Link href={`https://twitter.com/${meta.twitter}`}>
        <a className="twitter" target="_blank">
          @{meta.twitter}
        </a>
      </Link>
      <span className="twitter-mobile">
        (
        <Link href={`https://twitter.com/${meta.twitter}`}>
          <a target="_blank">@{meta.twitter}</a>
        </Link>
        )
      </span>
    </span>
    <style jsx>{`
      .author {
        display: inline-flex;
        align-items: center;
        padding: 0 1rem;
        margin-bottom: 0.5rem;
        white-space: nowrap;
      }
      img {
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
        border-radius: 50%;
        background: #efefef;
      }
      .name {
        line-height: 1.1rem;
        text-align: left;
      }
      .real-name {
        display: block;
      }
      .twitter {
        font-size: 12px;
      }
      .twitter-mobile {
        display: none;
        margin-left: 0.25rem;
      }
      // CSS only media query for mobile
      @media screen and (max-width: 640px) {
        img {
          width: 1.5rem;
          height: 1.5rem;
        }
        .real-name {
          display: inline;
        }
        .twitter {
          display: none;
        }
        .twitter-mobile {
          display: initial;
        }
      }
    `}</style>
  </div>
)

const HeaderImage = meta => {
  if (meta.headerImage) {
    return (
      <div>
        <style jsx>{`
          div {
            background-image: url(${meta.headerImage});
            background-size: cover;
            background-position: center 30%;
            width: 100%;
            padding: 11% 0;
            min-height: 220px;
          }
        `}</style>
      </div>
    )
  }
  return null
}

export default meta => ({ children }) => {
  const date = meta.date ? new Date(meta.date) : new Date()

  return (
    <MDXProvider components={components}>
      <Page title={`Blog - ${meta.title} | Next.js`}>
        <SocialMeta
          image={'/static' + meta.link + '/twitter-card.png'}
          {...meta}
        />
        <MediaQueryConsumer>
          {({ isMobile }) => (
            <Header height={64 + (isMobile ? 32 : 0)} shadow defaultActive>
              <Navbar />
            </Header>
          )}
        </MediaQueryConsumer>
        <HeaderImage {...meta} />
        <Container padding>
          <h1 className="title fw6 f0">{meta.title}</h1>
          {meta.type && <span className="post-type mute fw7">{meta.type}</span>}
          <div className="date mute f6">
            <time dateTime={meta.date}>
              {formatDate(date, 'dddd, MMMM Do YYYY')} (
              {distanceInWordsToNow(date, {
                addSuffix: true
              })}
              )
            </time>
          </div>
          <div className="authors">
            {meta.authors.map(data => (
              <Author key={data.name} {...data} />
            ))}
          </div>
          <Container small wide overflow>
            <content>{children}</content>
            <div className="back-button">
              <Button href="/blog" invert prefetch>
                <span className="icon">
                  <ArrowLeftLong color="white" />
                </span>{' '}
                Back to Blog
              </Button>
            </div>
          </Container>
        </Container>
        <Footer />
        <style jsx>{`
          .title {
            text-align: center;
          }
          .date {
            margin-top: 2rem;
            text-align: center;
          }
          .authors {
            margin: 1.5rem 0 4rem;
            text-align: center;
          }
          .back-button {
            margin-top: 8rem;
          }
          .icon {
            line-height: 0;
            vertical-align: middle;
          }
          .post-type {
            display: block;
            text-align: center;
            text-transform: uppercase;
            font-size: 12px;
            color: #0076ff;
          }
          // CSS only media query for mobile
          @media screen and (max-width: 640px) {
            .authors {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-left: -1rem;
              margin-right: -1rem;
            }
            .title {
              text-align: center;
            }
            .date {
              margin-top: 1rem;
              text-align: center;
            }
          }
        `}</style>
      </Page>
    </MDXProvider>
  )
}
