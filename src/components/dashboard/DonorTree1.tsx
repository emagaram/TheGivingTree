import React from 'react';
import Tree from 'react-d3-tree';
import "./donor-tree.css"
import logo from "./logo512.png";

//USE REACTD3 GRAPH INSTEAD

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
    name: 'CEO',
    children: [
        {
            name: 'Manager',
            attributes: {
                department: 'Production',
            },
            children: [
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Fabrication',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Assembly',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
            ],
        },
    ],
};
const renderRectSvgNode = () => (
    //  <g>
    <img src={logo} width="100" height="50" />

    //</g>
);
export default function DonorTree1() {
    return (
        // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
        <div id="treeWrapper" style={{ width: '500em', height: '200em' }}>
            <Tree data={orgChart} orientation={"vertical"}
                rootNodeClassName="node__root"
                branchNodeClassName="node__branch"
                leafNodeClassName="node__leaf"
                renderCustomNodeElement={renderRectSvgNode}
            ></Tree>
        </div>
    );
}