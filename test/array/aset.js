 
const aget=require('../../src/array/aget');
const aset=require('../../src/array/aset');

 
// Example usage:
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

// Set a new value
//const newTreeData = set(treeData, ['item1', 'subItem1', 'subSubitem1', 'fish'], 'tuna');
// set(treeData, ['item1', 'fish'], 'tuna');

 
// writing on PROPERTIES
  aset(treeData, ['item1','subItem1', 'fish'], 'tuna');
  console.log(JSON.stringify(treeData,null,2))
//  console.log(get(treeData,['item1','subItem1', 'fish']))
//  set(treeData, 'item1.subItem1.fish', 'hake'); 
//  console.log(get(treeData,['item1','subItem1', 'fish']))
 



// Check if the set operation was successful
 // console.log(JSON.stringify(newTreeData,null,2)); // Output: false
