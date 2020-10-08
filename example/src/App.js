import React, { useState } from 'react'

import { Tabs } from '@mv-react/tabs'
import '@mv-react/tabs/dist/index.css'

const Fields = () => (
  <div>
    <h2>Fields</h2>
    <p>Fields will come here.</p>
  </div>
)

const Preview = () => (
  <div>
    <h2>Preview</h2>
    <p>Preview will come here.</p>
  </div>
)

const Rules = () => (
  <div>
    <h2>Rules</h2>
    <p>Rules will come here.</p>
  </div>
)

const Validations = () => (
  <div>
    <h2>Validations</h2>
    <p>Validations will come here.</p>
  </div>
)

const App = () => {
  const [tabs, setTabs] = useState([
    { label: 'Fields', id: 'fields', component: Fields },
    { label: 'Preview', id: 'preview', component: Preview },
    { label: 'Rules', id: 'rules', component: () => <h1>Hello</h1> },
    {
      label: 'Validations',
      id: 'validations',
      disabled: true,
      component: Validations
    }
  ])

  return (
    <>
      <Tabs
        bindName='label'
        tabs={tabs}
        orientation='veritcal'
        onTabChange={(activeTab) => console.log('Active Tab:: ', activeTab)}
        defaultActive='fields'
        className='custom-tabs'
      />

      <button
        onClick={() =>
          setTabs([...tabs, { label: tabs.length, id: tabs.length }])
        }
      >
        Add Tab
      </button>
    </>
  )
}

export default App
