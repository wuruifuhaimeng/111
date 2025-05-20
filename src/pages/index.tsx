import { useState } from 'react';
import { FolderIcon, DocumentIcon } from '@heroicons/react/24/outline';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
}

export default function Home() {
  const [tools] = useState<Tool[]>([
    {
      id: 'file-lister',
      name: '文件列表工具',
      description: '一个简单的文件列表工具，支持按不同条件排序',
      icon: 'folder',
      path: '/tools/file-lister'
    },
    // 可以在这里添加更多工具
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">我的工具集</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    {tool.icon === 'folder' ? (
                      <FolderIcon className="h-6 w-6 text-blue-500" />
                    ) : (
                      <DocumentIcon className="h-6 w-6 text-gray-500" />
                    )}
                    <h3 className="ml-2 text-lg font-medium text-gray-900">
                      {tool.name}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {tool.description}
                  </p>
                  <div className="mt-4">
                    <a
                      href={tool.path}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      使用工具
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 