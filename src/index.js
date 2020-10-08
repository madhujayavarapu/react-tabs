import React, { useState } from 'react'
import styles from './styles.module.css'
import { isNullOrUndefined } from './helpers'

export const Tabs = ({
  tabs,
  defaultActive = 2,
  onTabChange,
  orientation = 'horizontal',
  bindValue = 'id',
  bindName = 'name',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultActive)

  // Update active tab.
  const handleTabChange = (tab) => {
    // Update active tabIndex.
    setActiveTab(getTabBindValue(tab))
    // If callback present send callback with active tab info.
    if (onTabChange) onTabChange(tab)
  }

  const getTabBindValue = (tab) =>
    bindValue && !isNullOrUndefined(tab) && typeof tab === 'object'
      ? tab[bindValue]
      : tab

  const getTabDisplayName = (tab) => {
    if (isNullOrUndefined(tab)) {
      console.error(`Tab item should not be null or undefined`)
      return ''
    }

    const name = bindName && typeof tab === 'object' ? tab[bindName] : tab

    if (!isNullOrUndefined(name)) return name

    console.warn(`${bindName} doesn't found in tab item `, tab)
    return ''
  }

  const renderActiveTabContent = (tab) => {
    const activeTabInfo = tabs.find((t) => getTabBindValue(t) === tab)

    const Component =
      typeof activeTabInfo === 'object' ? activeTabInfo.component : null

    return (
      <div className={styles.tab__content}>
        {Component ? <Component /> : 'No Component provided'}
      </div>
    )
  }

  const isTabDisabled = (tab) =>
    typeof tab === 'object' ? !!tab.disabled : !!tab

  return (
    <div className={styles.tabs__wrapper}>
      <ul
        className={`${styles.tabs} ${
          orientation === 'veritcal' ? styles.veritcal : ''
        } ${className}`}
      >
        {tabs.map((tab, i) => (
          <li
            role='tab'
            key={i}
            className={`${styles.tabs__item} ${
              getTabBindValue(tab) === activeTab ? styles.active : ''
            } ${isTabDisabled(tab) ? styles.disabled : ''}`}
            onClick={() => !isTabDisabled(tab) && handleTabChange(tab)}
            aria-selected={tab === activeTab ? true : null}
            aria-disabled={tab.disabled ? true : null}
          >
            {getTabDisplayName(tab)}
          </li>
        ))}
      </ul>

      {renderActiveTabContent(activeTab)}
    </div>
  )
}
