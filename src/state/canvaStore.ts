import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Query, TableData } from "@/features/modals/canva/types";
import { applyEdgeChanges, applyNodeChanges, type Edge, type EdgeChange, type Node, type NodeChange } from "@xyflow/react";

export type CanvasState = {
  nodes: Node<TableData>[];
  edges: Edge[];
  queries: Query[];
  id: string;
  setId: (id: string) => void;
  setQueries: (queries: Query[]) => void;
  setNodes: (nodes: Node<TableData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node<TableData>) => void;
  addEdge: (edge: Edge) => void;
  editNode: (nodeId: string, newNode: Node<TableData>) => void;
  removeNode: (nodeId: string) => void;
  removeEdge: (edgeId: string) => void;
  removeQuery: (queryString: string) => void;
  onNodesChange: (changes: NodeChange<Node<TableData>>[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  _hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
};


export const useCanvasStore = create<CanvasState>()(
  persist(
    immer((set, get) => ({
      nodes: [],
      edges: [],
      queries: [],
      id: "",
      setId: (id) => {
        set((state) => {
          state.id = id;
        });
      },
      setQueries: (queries) => {
        set((state) => {
          state.queries = queries;
        });
      },
      setNodes: (nodes) => {
        set((state) => {
          state.nodes = nodes;
        });
      },
      setEdges: (edges) => {
        set((state) => {
          state.edges = edges;
        });
      },
      addNode: (node) => {
        set((state) => {
          state.nodes.push(node);
        });
      },
      addEdge: (edge) => {
        set((state) => {
          state.edges.push(edge);
        });
      },
      editNode: (nodeId, newNode) => {
        set((state) => {
          const index = state.nodes.findIndex((node) => node.id === nodeId);
          if (index !== -1) {
            state.nodes[index] = newNode;
          }
        });
      },
      removeNode: (nodeId) => {
        set((state) => {
          state.nodes = state.nodes.filter((n) => n.id !== nodeId);
        });
      },
      removeEdge: (edgeId) => {
        set((state) => {
          state.edges = state.edges.filter((e) => e.id !== edgeId);
        });
      },
      removeQuery: (queryString) => {
        set((state) => {
          state.queries = state.queries.filter((q) => q.full_query !== queryString);
        });
      },
      onNodesChange: (changes: NodeChange<Node<TableData>>[]) => {
        set((state) => {
          state.nodes = applyNodeChanges<Node<TableData>>(changes, state.nodes);
        });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      _hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ _hasHydrated: hasHydrated }),
    })),
    {
      name: "canvas-storage",
      partialize: (state) => ({
        id: state.id,
        nodes: state.nodes,
        edges: state.edges,
        queries: state.queries,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);