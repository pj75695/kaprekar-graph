import Sigma from "sigma";
import Graph from "graphology";
import data from "./graph.json"; // Bundler imports your local JSON output directly

const graph = new Graph({ type: "directed" });

// Build out the nodes from the Python data
data.nodes.forEach(node => {
    graph.addNode(node.id, {
        label: String(node.id),
        // Spread nodes out uniformly at random across a coordinate space
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3,
        color: "#3b82f6", // Vibrant blue
        journey: node.journey || [],
    });
});

// Connect nodes via directed graph links
data.links.forEach(link => {
    if (!graph.hasEdge(link.source, link.target)) {
        graph.addDirectedEdge(link.source, link.target, {
            type: "arrow",
            color: "#4b5563", // Slate grey edges
            zIndex: 0
        });
    }
});

// Render the network onto the DOM canvas element
const container = document.getElementById("sigma-container");

let selectedNode = null;


const renderer = new Sigma(graph, container, {
    zIndex: true,
    
    labelColor: {
        color: "#FFD700"
    },

    nodeReducer: (node, data) => {
        const res = { ...data };

        if (selectedNode) {
            const journey =
                graph.getNodeAttribute(selectedNode, "journey") || [];

            if (journey.includes(node)) {
                res.color = "#fa1515";
                res.zIndex = 5;
            }
        }

        return res;
    },

    edgeReducer: (edge, data) => {
        const res = { ...data };

        res.zIndex = 0;
        res.size = 1;

        if (selectedNode) {
            const journey =
                graph.getNodeAttribute(selectedNode, "journey") || [];

            const source = graph.source(edge);
            const target = graph.target(edge);

            if (
                journey.includes(source) &&
                journey.includes(target)
            ) {
                res.color = "#fa1515";
                res.size = 6;

                res.zIndex = 10;
            }
        }

        return res;
    }
});


// Render input
const input = document.getElementById('value');

// Listen for typing
input.addEventListener("input", () => {
    const value = input.value.trim();

    selectedNode = graph.hasNode(value) ? value : null;

    renderer.refresh();
});