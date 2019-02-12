import Frame from 'react-frame-component'

const makeLink = onSelect => ({ tab, children }) => (
  <a href="javascript:;" onClick={() => onSelect(tab)}>
    {children}
  </a>
)

export default Comp => ({ onSelect }) => (
  <Frame title="Next.js Demo">
    <Comp A={makeLink(onSelect)} />
  </Frame>
)
