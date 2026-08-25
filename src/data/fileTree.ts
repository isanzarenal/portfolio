import { projects } from './projects'

export type FileNode = {
  type: 'file'
  name: string
  /** Route path this file opens. Files without a path are visually present but not navigable yet. */
  path?: string
}

export type FolderNode = {
  type: 'folder'
  name: string
  /** Route this folder opens when clicked, e.g. the projects/ index. Plain folders (no index view) omit this. */
  path?: string
  children: TreeNode[]
}

export type TreeNode = FileNode | FolderNode

export const fileTree: FolderNode = {
  type: 'folder',
  name: 'portfolio',
  children: [
    { type: 'file', name: 'about.md', path: '/about' },
    { type: 'file', name: 'skills.json', path: '/skills' },
    { type: 'file', name: 'experience.log' },
    { type: 'file', name: 'resume.pdf' },
    { type: 'file', name: 'contact' },
    {
      type: 'folder',
      name: 'projects',
      path: '/projects',
      children: projects.map((project) => ({
        type: 'file',
        name: project.fileName,
      })),
    },
  ],
}

/** Finds the file node whose route path matches, e.g. for syncing open tabs to the current route. */
export function findFileByPath(path: string): FileNode | undefined {
  function search(nodes: TreeNode[]): FileNode | undefined {
    for (const node of nodes) {
      if (node.type === 'file') {
        if (node.path === path) return node
      } else {
        const found = search(node.children)
        if (found) return found
      }
    }
    return undefined
  }

  return search(fileTree.children)
}
