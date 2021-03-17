export const getQueryString = (params: Record<string, any>, hasEncode = true) =>
  Object.keys(params)
    .filter((key) => params[key])
    .map(
      (key) =>
        `${key}=${hasEncode ? encodeURIComponent(params[key]) : params[key]}`,
    )
    .join('&')
