const React = (function() {
  let hooks = []
  let idx = 0
  console.log("hooks outside:", hooks);
  const useState = (initVal) => {
    const state = hooks[idx] || initVal
    const _idx = idx

    const setState = (newVal) => {
      hooks[_idx] = newVal
    }
    idx++
    return [state, setState]
  }

  const render = (component) => {
    idx = 0
    const c = component()
    c.render()
    return c
  }

  const useEffect = (cb, depArray) => {
    let oldDeps = hooks[idx]
    let hasChanged = true
    if(oldDeps) {
      hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]))
    }
    hasChanged && cb()
    hooks[idx] = depArray
    idx++
  }
  return {useState, render, useEffect}
})()

const Component = () => {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState('apple')
  React.useEffect(() => {
    console.log('useEffect running');
  }, [text])

  return {
    render: () => console.log({count, text}),
    click: () => setCount(count + 1),
    type: () => setText('pear')
  }
}

var App = React.render(Component)
App.click()
var App = React.render(Component)
App.type()
var App = React.render(Component)
