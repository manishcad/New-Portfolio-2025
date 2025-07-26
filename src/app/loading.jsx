export const metadata = {
  title: 'Loading...',
  description: 'Loading Manish Chand Portfolio',
  robots: {
    index: false,
    follow: false,
  },
}

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
        <p className="text-gray-500 mt-2">Please wait while we load the content</p>
      </div>
    </div>
  )
} 