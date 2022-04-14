export const updateContentCache = (cache, contentId = null) => {
  if (contentId) {
    cache.evict({
      id: cache.identify({
        __typename: 'Content',
        id: contentId
      })
    })
  }

  const queriesToInvalidate = [
    'getContents'
    // 'getCategoriesWithAmount',
    // 'getTransactionsFilterOptions',
    // 'getCashflowData',
    // 'getChartHistory',
    // 'getChartCategories'
  ]

  for (const queryName of queriesToInvalidate) {
    cache.evict({
      id: 'ROOT_QUERY',
      fieldName: queryName,
      broadcast: false
    })
  }
}
