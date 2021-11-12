/* eslint-disable no-undef */

const initStorage = () => {
    chrome.storage.sync.get(['workspaces'], (result) => {
        if(Object.keys(result).length === 0)
            chrome.storage.sync.set({workspaces: []});
    })

    chrome.storage.sync.set({popupLastWorkspace: ''});
};

// const initStorage = async () => {
//     let a = new Promise((resolve, reject) => {
//         chrome.storage.sync.get(['workspaces'], (result) => {
//             if(Object.keys(result).length === 0)
//                 chrome.storage.sync.set({workspaces: []});
//             resolve(true); 
//         });
//     })

//     return await a;
// }

const workspaceCollection = (newWorkspace) => {
    chrome.storage.sync.get(['workspaces'], (obj) => {
        obj.workspaces.push(newWorkspace);
        chrome.storage.sync.set({workspaces: obj.workspaces});
    })
};

const addNewWorkspace = (newWorkspace, description) => {
    let obj = {};
    obj[newWorkspace] = [];

    let descriptionObj = {description: description};
    obj[newWorkspace].push(descriptionObj);
    chrome.storage.sync.set(obj, () => {
        console.log('New workspace created');
    });
};

const addNewQuicklink = (quicklinkObj, workspace) => {
    chrome.storage.sync.get(workspace, (obj) => {
        console.log(obj);
        obj[workspace].push(quicklinkObj);
        chrome.storage.sync.set({[workspace]: obj[workspace]});
    })
};

const fetchWorkspace = async () => {
    let a = new Promise((resolve, reject) => {
        chrome.storage.sync.get('workspaces', (item) => {
            resolve(item);
        });
    });

    const workspaceObj = await a;
    return workspaceObj.workspaces;
}

const fetchWorkspaceQuicklinks = async (workspace) => {
    let p = new Promise(resolve => {
        chrome.storage.sync.get(workspace, (item) => {
            resolve(item);
        });
    });
    const obj = await p;
    return obj;
}

const deleteQuicklink = (workspace, quicklink) => {
    chrome.storage.sync.get(workspace, (obj) => {
        let newArr = obj[workspace].filter((elem) => ( elem.quicklink_name !== quicklink));
        chrome.storage.sync.set({[workspace]: newArr})
    })
}

const editQuicklinkObj = (workspace, quicklinkName, newQuicklink) => {
    chrome.storage.sync.get(workspace, (obj) => {
        let newArr = obj[workspace].map((elem) => {
            if(elem.quicklink_name === quicklinkName) {
                elem = {...newQuicklink};
            }
            return elem;
        });
        // console.log(newArr);
        chrome.storage.sync.set({[workspace]: newArr});
    });
}

const setPopupLastWorkspace = (workspace) => {
    chrome.storage.sync.set({popupLastWorkspace: workspace});
}

const getPopupLastWorkspace = async () => {
    let a = new Promise((resolve, reject) => {
        chrome.storage.sync.get('popupLastWorkspace', (item) => {
            resolve(item);
        });
    });

    const lastWorkspace = await a;
    return lastWorkspace.popupLastWorkspace;
}

export { initStorage, 
    workspaceCollection,
    addNewWorkspace, 
    addNewQuicklink, 
    fetchWorkspace, 
    fetchWorkspaceQuicklinks, 
    deleteQuicklink,
    editQuicklinkObj,
    setPopupLastWorkspace,
    getPopupLastWorkspace } ;
