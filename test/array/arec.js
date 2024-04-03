 const arec=require('../../src/array/arec');


const treeData = [
    {
        key: 'item1',
        isOpen: false,
        children: [
            {
                key: 'subItem1',
                isOpen: false,
                children: [
                    { key: 'subSubitem1', isOpen: false, children: [] },
                ],
            },
            { key: 'subitem2', isOpen: false, children: [] },
        ],
    },
    {
        key: 'item2',
        isOpen: false,
        children: [
            { key: 'subItem1', isOpen: false, children: [] },
            { key: 'subitem2', isOpen: false, children: [] },
        ],
    },
];
 

// Example callback function: Add a property to each item, including children and path
  
arec(treeData,  (item, itemPath)=> {
    console.log(item.key,' path:', itemPath);
    
});


// Update items recursively
const newTreeData = arec(treeData, (item, itemPath) => {
    return { ...item, newProperty: 'new value'};
});


 
console.log(newTreeData);
