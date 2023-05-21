import Image from 'next/image';
import MainLayout from '../../components/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className="flex items-center min-h-screen justify-center">
        Hello world!
      </div>
    </MainLayout>
  );
}
