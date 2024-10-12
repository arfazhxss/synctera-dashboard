import Image from 'next/image'
import Synctera from '@/lib/synctera-black.svg'

const LoadingScreen: React.FC = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
            <Image
                src={Synctera}
                alt="Synctera"
                width={200}
                height={100}
                className="mb-4"
            />
            <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        </div>
    </div>
)

export default LoadingScreen