import LoginForm from '../components/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    (<div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/food-background.jpg"
          alt="Food background"
          layout="fill"
          objectFit="cover"
          quality={100} />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Everybody Eats</h1>
          <p className="text-xl text-gray-200">Sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>)
  );
}

