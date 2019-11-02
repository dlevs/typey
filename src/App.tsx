/** @jsx jsx */
import { jsx } from '@emotion/core'
import { StrictMode, useState, useTransition, Fragment, Suspense } from 'react'
import StylesGlobal from './components/StylesGlobal'
import ErrorBoundary from './components/ErrorBoundary'
import TypingText from './components/TypingText'
import TypingStatsDisplay from './components/TypingStatsDisplay'
import { wrapPromise, Resource } from './lib/suspenseUtils'
import { getPageSummary } from './api/wikipedia'

const initialResource = wrapPromise(
  Promise.resolve('When you spring to an idea, and decide it is truth, without evidence, you blind yourself to other possibilities.\n\tKeep these nutty chicken satay strips in the fridge for a healthy choice when you\'re peckish. The chicken is served with cucumber and sweet chilli sauce.')
)

// TODO: Tidy
const ExperimentalApp = () => {
  const [targetValueResource, setTargetValueResource] = useState(initialResource)
  const [startTransition] = useTransition({ timeoutMs: 2000 });
  const [searchTerm, setSearchTerm] = useState('')
  const [searchedTerm, setSearchedTerm] = useState(null as null || '')

  return (
    <Fragment>
      <form onSubmit={event => {
        event.preventDefault()

        startTransition(() => {
          setTargetValueResource(
            wrapPromise(
              getPageSummary(searchTerm).then(({ extract }) => extract)
            )
          )
          setSearchedTerm(searchTerm)
        })
      }}>
        <input
          value={searchTerm}
          onChange={event => {
            setSearchTerm(event.currentTarget.value)
          }}
        />
      </form>
      <ErrorBoundary
        // TODO: This won't reset the boundary if search term is same twice in a row, and 2nd is successful
        errorKey={searchedTerm}
        fallbackMap={{
          404: 'No results found',
          default: 'Something went wrong'
        }}
      >
        <Suspense fallback={'loading...'}>
          <App targetValueResource={targetValueResource} />
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  )
}

const App = ({
  targetValueResource
}: {
  targetValueResource: Resource<string>
}) => {
  // const chars = useKeysPressed(window, playKeypressSound)
  const targetValue = targetValueResource.read()
  const [value, setValue] = useState('')

  return (
    <StrictMode>
      <StylesGlobal />
      <TypingStatsDisplay
        // TODO: nope
        chars={[...value].map(char => ({ char, timeStamp: 0 }))}
        targetValue={targetValue}
      />
      <TypingText
        value={value}
        onValueChange={setValue}
        targetValue={targetValue}
      />
    </StrictMode>
  );
}

export default ExperimentalApp;
