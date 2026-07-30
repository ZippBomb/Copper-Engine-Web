export type DocData = {
    name: string;
    content: string;
    summary: string;

    type: string;
    header: string;
    source: string;
    namespace: string;
}
export type DocTreeNode = {
    name: string;
    path: string;
    subDirs?: DocTreeNode[];
    entries?: string[];
}
