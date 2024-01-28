import StakeNavbar from 'components/StakeNavbar'
import StakingBox from 'components/StakingBox'
import React from 'react'

export default function Stake() {
  return (
    <>
    <StakeNavbar/>
    <div className="sm:max-w-[472px] w-full bg-main-bg mx-auto">
        <StakingBox />
      </div>
    </>
  )
}
