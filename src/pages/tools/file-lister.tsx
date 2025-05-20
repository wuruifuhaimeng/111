import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function FileLister() {
  const [sortBy, setSortBy] = useState('name');
  const [reverse, setReverse] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleListFiles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/list-files?sortBy=${sortBy}&reverse=${reverse}`);
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('Error listing files:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">文件列表工具</h1>
          
          <div className="mb-6 flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="name">按名称</option>
              <option value="size">按大小</option>
              <option value="modified">按修改时间</option>
            </select>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={reverse}
                onChange={(e) => setReverse(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2">反向排序</span>
            </label>

            <button
              onClick={handleListFiles}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? (
                <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
              ) : null}
              列出文件
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    名称
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    大小
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    修改时间
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {files.map((file: any) => (
                  <tr key={file.name}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {file.is_dir ? `[目录] ${file.name}` : file.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {file.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {file.modified}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 