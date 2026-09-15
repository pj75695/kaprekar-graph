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
        size: 6,
        color: "#3b82f6" // Vibrant blue
    });
});

// Connect nodes via directed graph links
data.links.forEach(link => {
    if (!graph.hasEdge(link.source, link.target)) {
        graph.addDirectedEdge(link.source, link.target, {
            type: "arrow",
            color: "#4b5563" // Slate grey edges
        });
    }
});

// Render the network onto the DOM canvas element
const container = document.getElementById("sigma-container");
const renderer = new Sigma(graph, container);