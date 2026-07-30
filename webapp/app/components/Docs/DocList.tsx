import { DocData, DocTreeNode } from "./Types"

import { cache } from "react"

import matter from "gray-matter";

import fs from "fs/promises"
import path from "path";

const docsPath = path.join(process.cwd(), "public/docs")

export async function GetDoc(dir : string) : Promise<DocData | undefined> {

    dir = dir.replaceAll('.', path.sep) + ".md";
    const filePath = path.join(docsPath, dir);

    try { await fs.access(filePath); }
    catch {

        console.log(`doc '${filePath}' does not exist`);
        return undefined;

    }

    const stats = await fs.stat(filePath);
    if (!stats.isFile()) return undefined;

    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
        name: path.parse(dir).name,
        content: content,
        summary: data.summary,

        type: data.type,
        header: data.header,
        source: data.source,
        namespace: data.namespace,
    }

}

async function GetDocTree() : Promise<DocTreeNode | undefined> {

    let ret: DocTreeNode[] = [ { name: "Engine", path: "Engine" }, { name: "Editor", path: "Editor" }, ];
    let tree: DocTreeNode[] = [ ret[1], ret[0], ];

    async function walk(dir : string, parent: DocTreeNode) {

        const files = await fs.readdir(dir);
        const back = tree[tree.length - 1];

        back.subDirs = [];
        back.entries = [];

        for (const file of files) {

            let fullPath = path.join(dir, file);
            let stat = await fs.stat(fullPath);

            if (stat.isDirectory()) {

                back.subDirs.push({
                    name: file,
                    path: parent.path + '.' + file,
                });
                tree.push(back.subDirs[back.subDirs.length - 1]);

                await walk(fullPath, back.subDirs[back.subDirs.length - 1]);

            } else {

                const title = file.substring(0, file.lastIndexOf('.'));
                back.entries.push(title);

            }

        }

        tree.pop();

    }

    await walk(path.join(docsPath, "Engine"), ret[0]);

    return { name: "/", path: "/", subDirs: ret };

}

export const GetDocTreeCached = cache(async () => {

    return await GetDocTree();
    
});
