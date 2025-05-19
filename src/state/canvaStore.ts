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
  removeNode: (nodeId: string) => void;
  removeEdge: (edgeId: string) => void;
  removeQuery: (queryString: string) => void;
  onNodesChange: (changes: NodeChange<Node<TableData>>[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
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
        set({
          nodes: applyNodeChanges<Node<TableData>>(changes, get().nodes),
        });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
    })),
    {
      name: "canvas-storage",
      partialize: (state) => ({
        nodes: state.nodes,
        edges: state.edges,
        queries: state.queries,
      }),
    }
  )
);