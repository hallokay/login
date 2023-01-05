const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
        const res = await fetch(url, optionsObj);
        
        if(!res.ok) throw Error('앱을 다시 로드에주세요.')
    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
};

export default apiRequest;