import Link from 'next/link'
import classNames from 'classnames'
import formatDate from 'date-fns/format'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import Container from '../container'
import Button from '../button'
import ArrowRightLong from '../icons/arrow-right-long'

export default ({
  type,
  thumbnail,
  detail,
  link,
  title,
  date,
  prefetch,
  children
}) => {
  return (
    <div className="post-preview">
      <style jsx>{`
        .post-preview {
          padding: 2.5rem 0;
          margin-bottom: -1px;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          transition: all 0.2s ease;
        }
        .post-preview:hover {
          box-shadow: 0 5px 40px rgba(0, 0, 0, 0.04);
        }
        .post-title {
          display: inline-block;
          cursor: pointer;
        }
        .read-more {
          margin-top: 2rem;
        }
        .date {
          margin-top: 0.4rem;
          margin-bottom: 1rem;
        }
        .icon {
          line-height: 0;
          vertical-align: middle;
        }
        .thumbnail {
          width: 280px;
          margin-left: 1rem;
        }
        .thumbnail img {
          width: 100%;
          max-width: 50vw;
        }
        .preview-layout {
          display: flex;
          align-items: center;
        }
        .preview-content {
          flex: 1;
        }
        .post-type {
          display: block;
          text-transform: uppercase;
          font-size: 12px;
          color: #0076ff;
        }
        // CSS only media query for mobile
        @media screen and (max-width: 640px) {
          .post-preview {
            padding: 1.5rem 0;
          }
          .preview-layout {
            flex-direction: column-reverse;
          }
          .thumbnail {
            width: 100%;
            margin-left: 0;
            margin-bottom: 1rem;
          }
          .thumbnail img {
            max-width: 100%;
          }
        }
      `}</style>
      <Container small>
        <div className="preview-layout">
          <div className="preview-content">
            {type && <span className="post-type mute fw6">{type}</span>}
            <Link href={link} prefetch={prefetch}>
              <h3 className="f2 fw6 post-title">{title}</h3>
            </Link>
            <p className="f6 date mute">
              {formatDate(date, 'dddd, MMMM Do YYYY')} (
              {distanceInWordsToNow(date, {
                addSuffix: true
              })}
              )
            </p>
            {detail && <section className="description f5">{children}</section>}
            <div className="read-more">
              <Button href={link}>
                Read More{' '}
                <span className="icon">
                  <ArrowRightLong color="currentColor" />
                </span>
              </Button>
            </div>
          </div>
          {thumbnail && (
            <div className="thumbnail">
              <img src={thumbnail} />
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
