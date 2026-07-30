---
title: Copper-Devlog #1 - Installer, packaging and 0.3. release
summary: Read the first Copper-Devlog, a monthly series where we share the updates of our work on the Copper-Engine project. Find out about our installer, linux packages and the release of Copper-Engine 0.3.
thumbnail: /articles/media/FirstArticleThumbnail.png
---
Hello, World!

Welcome to the first blog of the new monthly series, Copper-Devlogs, where we share the development progress of the Copper-Engine project every month.

The month of december was a hectic one. I barely had time to work on anything, which paired with a phase of zero motivation led to very little development in the first half of the month. During the second half of the month, I have been working on the releasing part of releasing a version, which included making a Windows Installer, Pacman packages, testing out both of those on a fresh VM and lastly, fixing any bugs or issues found, all of which will be talked about in this devlog.

## Installer
While development of Copper-Engien is done almost entirely on linux, Windows is the primary target group as that is the operating system most developers use. Which is why this was the first and main focus this month.

I've personally never written an installer, so this was also a big learning journey for me, which is why the result may not be the best, industry standard installer, but at least I tried right ?

Doing some quick research, I decided to go with [NSIS](https://nsis.sourceforge.io/Main_Page) (Nullsoft Scriptable Install System), which, for the uninformed, is a scripting language where you write an installer, tell it what files to package, how to install them and where, and the NSIS compiler compresses it all into a single executable you can distribute anywhere. I added a directory to the [Copper-Engine github repository](https://github.com/OfficialKrisHass/Copper-Engine/tree/dev) called Installer, with the [Copper-Installer.nsi](https://github.com/OfficialKrisHass/Copper-Engine/blob/dev/Installer/Copper-Installer.nsi) installer script.

### Minimal installer
Initially I started with the simplest installer which looks something like this.

```nsi
!define /file VERSION ..\Version

Name "Copper-Engine"
InstallDir "$PROGRAMFILES\Copper-Engine"
OutFile "Copper-Engine_x86-64_v${VERSION}.exe"

Section

	SetOutPath $INSTDIR

	File /r /x *.pdb /x Intermediate /x Temp "..\Build\windows-x86_64-Release\Copper-Editor"
    File /r /x *.pdb /x Intermediate "..\Build\windows-x86_64-Release\Copper-Launcher"

SectionEnd
```

The jist of it boils down to the code inside the Section section. The File command tells the installer what file to compress, and later install. We use the /r recursive option, since we want to install the whole directory which in this case includes the executable, binaries and assets of the Copper-Editor and Copper-Launcher. The /x options indicate what files or directories to exclude, which in our case is the Intermediate directory (containing .obj files and stuff like that) and the Temp directory (contains the scene_lock.cu and fields.cu files).

Compiling this script will result in a working installer that does successfully copy the Copper-Editor and Copper-Launcher files into the installation directory. But when was the simplest solution ever the right one.

### Persistent Data
This script misses the launchers persistent data, which contain the path to the Copper-Editor executable and the loaded projects. Without this data, specifically the Copper-Editor executable path, the launcher won't work properly and will ask the user to pinpoint the location of the Copper-Editor executable.

Since this file will change depending on the installation directory, it can't be really compressed and installed, instead we have to manually write it like this.

```nsi
 CreateDirectory "$APPDATA\Copper-Engine"
FileOpen $0 "$APPDATA\Copper-Engine\LauncherData.cup" w

FileWrite $0 "Editor Path: $INSTDIR\Copper-Editor\Copper-Editor.exe$\r$\n"
FileWrite $0 "Project Entries: []$\r$\n"

File Close $0
```

I am not glad with this solution at all, but from a quick research and based on how NSIS works, this seems to be the most sane solution, for now.

### Uninstaller
One more important thing is the uninstaller. Thankfully this is dead simple, we just have to define an uninstall section like this.

```nsi
Section "Uninstall"

    RMDir /r "$INSTDIR\Copper-Editor"
    RMDir /r "$INSTDIR\Copper-Launcher"

    RMDir /r "$APPDATA\Copper-Engine"

    Delete "$INSTDIR\uninstall.exe"

    RMDir "$INSTDIR"

SectionEnd
```

and add the WriteUninstaller call to the main section.

```nsi
 WriteUninstaller "$INSTDIR\uninstall.exe"
```

This will place a file `uninstall.exe` in the installation directory, which will uninstall the editor and launcher. This came in extremely handy since I had to repeteadly install and uninstall on the VM to test out the installer properly and all.

### VC Redistributable
Unfortunately since Windows is retarded, because Copper-Engine is built using Visual Studio on Windows, and mono is a dynamically linked library, every computer needs the MSVC Runtime library installed to run Copper-Engine (and any application built in VS as a matter of a fact). Why things like dynamic linking, literally what Windows is using internally, is done by a third party library and not a library that comes pre installed with Windows, but alright.

Thankfully, Visual Studio provides an installer of