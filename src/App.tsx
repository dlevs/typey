/** @jsx jsx */
import { jsx } from '@emotion/core'
import { StrictMode, useState, useTransition, Fragment, Suspense, useEffect } from 'react'
import StylesGlobal from './components/StylesGlobal'
import ErrorBoundary from './components/ErrorBoundary'
import TypingText from './components/TypingText'
import TypingStatsDisplay from './components/TypingStatsDisplay'
import { wrapPromise, Resource } from './lib/suspenseUtils'
import { getPageSummary } from './api/wikipedia'

const createExtractResource = (query: string) => {
  const promise = getPageSummary(query).then(({ extract }) => extract)
  return wrapPromise(promise)
}

const initialResource = createExtractResource('Harry Potter')

// TODO: Tidy
const ExperimentalApp = () => {
  const [targetValueResource, setTargetValueResource] = useState(initialResource)
  const [startTransition] = useTransition({ timeoutMs: 500 })
  const [searchTerm, setSearchTerm] = useState('')
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue('')
  }, [targetValueResource])

  return (
    <StrictMode>
      <form onSubmit={event => {
        event.preventDefault()

        startTransition(() => {
          setTargetValueResource(createExtractResource(searchTerm))
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
        errorKey={targetValueResource.id}
        fallbackMap={{
          404: 'No results found',
          default: 'Something went wrong'
        }}
      >
        <Suspense fallback={'loading...'}>
          <App
            value={value}
            onValueChange={setValue}
            targetValueResource={targetValueResource}
          />
        </Suspense>
      </ErrorBoundary>
    </StrictMode>
  )
}

const App = ({
  value,
  onValueChange,
  targetValueResource
}: {
  value: string
  onValueChange: (value: string) => void
  targetValueResource: Resource<string>
}) => {
  console.log('before', targetValueResource)

  // const chars = useKeysPressed(window, playKeypressSound)
  const targetValue = targetValueResource.read()
  console.log('after', targetValueResource)

  return (
    <Fragment>
      <StylesGlobal />
      <TypingStatsDisplay
        // TODO: nope
        chars={[...value].map(char => ({ char, timeStamp: 0 }))}
        targetValue={targetValue}
      />
      <TypingText
        value={value}
        onValueChange={onValueChange}
        targetValue={targetValue}
      />
    </Fragment>
  );
}

export default ExperimentalApp;
