import { NextResponse } from 'next/server'
import os from 'os'

export async function GET() {
  try {
    const userInfo = os.userInfo()
    const systemInfo = {
      username: userInfo.username,
      homedir: userInfo.homedir,
      platform: os.platform(),
      hostname: os.hostname(),
      arch: os.arch(),
      release: os.release(),
      type: os.type()
    }

    // Get Windows-specific user information
    const windowsUserData = {
      name: userInfo.username,
      username: userInfo.username,
      domain: process.env.USERDOMAIN || 'Local',
      computerName: os.hostname(),
      homeDirectory: userInfo.homedir,
      platform: systemInfo.platform,
      architecture: systemInfo.arch,
      osRelease: systemInfo.release,
      osType: systemInfo.type
    }

    // Try to get more detailed Windows info if available
    if (process.platform === 'win32') {
      windowsUserData.domain = process.env.USERDOMAIN || windowsUserData.domain
    }

    return NextResponse.json({
      success: true,
      user: windowsUserData
    })
  } catch (error) {
    console.error('Error getting user info:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get user information',
        user: null
      },
      { status: 500 }
    )
  }
}