export const updateCategoryCache = (cache, categoryId = null) => {
  if (categoryId) {
    cache.evict({
      id: cache.identify({
        __typename: 'Category',
        id: categoryId
      })
    })
  }

  const queriesToInvalidate = [
    'getCategories'
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
