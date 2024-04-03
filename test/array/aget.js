
const aget=require('../../src/array/aget');

 
const treeData = [
    {
        key: 'item1',
        isOpen: false,
        children: [
            {
                key: 'subItem1',
                isOpen: false,
                children: [
                    { key: 'subSubitem1', isOpen: true, children: [] },
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

console.log(aget(treeData, ['item1', 'subItem1', 'subSubitem1','key'])); // Output: { key: 'subSubitem1', isOpen: true, children: [] }
