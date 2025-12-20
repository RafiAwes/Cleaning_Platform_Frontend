import SubTitle from '@/components/reusable/title'
import { ClientSayIcon } from '@/icon'
import Image from 'next/image'
import photo1 from '@/assets/guestPhoto1.png';
import photo2 from '@/assets/guestPhoto2.png';
import photo3 from '@/assets/guestPhoto3.png';

export default function LoveGuest() {
  return (
    <div className="pt-[48px] xl:pt-[148px]">
      <div className="pb-8">
        <SubTitle text="Why You'll Love Guest Ready" svg={<ClientSayIcon />} />
      </div>
      <div className="bg-secondary py-10">

        <div className='container px-4 '>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-6 xl:gap-3'>

            <div className='space-y-2'>
              <Image
                src={photo1}
                alt="Photo"
                width={500}
                height={500}
                className="w-full xl:h-[400px] rounded-[16px] "
              />
              <div className="space-y-2 max-w-[95%] text-center">
                <h1 className="text-[#000000] font-bold text-[16px] xl:text-[20px]">Vetted pros</h1>
                <p className="font-medium text-[16px] text-[#535353]">We handpick local experts so you get the best service, every time.</p>
              </div>
            </div>


            <div className='space-y-2'>
              <div className="space-y-2 max-w-[95%] text-center hidden xl:block">
                <h1 className="text-[#000000] font-bold text-[16px] xl:text-[20px]">Upfront Pricing</h1>
                <p className="font-medium text-[16px] text-[#535353]">Know the exact price before you commit. No surprises.</p>
              </div>
              <Image
                src={photo2}
                alt="Photo"
                width={500}
                height={500}
                className="w-full xl:h-[400px] rounded-[16px] "
              />

              <div className="space-y-2 max-w-[95%] text-center xl:hidden">
                <h1 className="text-[#000000] font-bold text-[16px] xl:text-[20px]">Upfront Pricing</h1>
                <p className="font-medium text-[16px] text-[#535353]">Know the exact price before you commit. No surprises.</p>
              </div>
            </div>

            <div className='space-y-2'>
              <Image
                src={photo3}
                alt="Photo"
                width={500}
                height={500}
                className="w-full xl:h-[400px] rounded-[16px] "
              />
              <div className="space-y-2 max-w-[95%] text-center">
                <h1 className="text-[#000000] font-bold text-[16px] xl:text-[20px]">Simple Scheduling</h1>
                <p className="font-medium text-[16px] text-[#535353]">Book, confirm, and manage your cleanings from any device.</p>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}
