import json
import itertools
import kaprekar
from kaprekar import kaprekar_full
import networkx as nx

# Digit combinations without ordering to reduce noise
orderings = ["".join(map(str, c)) for c in itertools.combinations_with_replacement(range(10), 5)]

def build_and_export_graph():
    G = nx.DiGraph()
    results = kaprekar_full(orderings)
    
    for source, path in results.items():
        # Store complete journey on starting node
        G.add_node(source, journey=[source] + path)
        
        prev = source
        for target in path:
            G.add_edge(prev, target)
            prev = target
            
    with open("graph.json", "w") as f:
        json.dump(nx.node_link_data(G), f, indent=2)

if __name__ == "__main__":
    build_and_export_graph()