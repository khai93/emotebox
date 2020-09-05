const ErrorHelper = {}

ErrorHelper.Handle = (err) => {
    console.error(err);
    // log error to some where
}

export { ErrorHelper as default}