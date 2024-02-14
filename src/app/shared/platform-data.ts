/**
 *  Platform abbreviations available in IGDB
 *  Split into handheld, console, and other
 * 
 *  Eventually move platform data into service.
 * 
 * Categories
 * ===========
 * console	1
 * arcade	2
 * platform	3
 * operating_system	4
 * portable_console	5
 * computer	6
 * 
 */



import { PlatformCategory } from "./enums/platform-category.enum";
import { IPlatform } from "./interfaces/platform.interface";


export const platforms: IPlatform[] =
    [
        {
            "id": 158,
            "category": 6,
            "name": "Commodore CDTV"
        },
        {
            "id": 339,
            "category": 1,
            "name": "Sega Pico",
            "platform_family": 3
        },
        {
            "id": 8,
            "abbreviation": "PS2",
            "category": 1,
            "name": "PlayStation 2",
            "platform_family": 1
        },
        {
            "id": 39,
            "abbreviation": "iOS",
            "category": 4,
            "name": "iOS"
        },
        {
            "id": 94,
            "abbreviation": "C+4",
            "category": 6,
            "name": "Commodore Plus/4"
        },
        {
            "id": 144,
            "category": 1,
            "name": "AY-3-8710"
        },
        {
            "id": 88,
            "abbreviation": "odyssey",
            "category": 1,
            "name": "Odyssey"
        },
        {
            "id": 90,
            "abbreviation": "cpet",
            "category": 6,
            "name": "Commodore PET"
        },
        {
            "id": 237,
            "category": 6,
            "name": "Sol-20"
        },
        {
            "id": 6,
            "abbreviation": "PC",
            "category": 4,
            "name": "PC (Microsoft Windows)"
        },
        {
            "id": 44,
            "abbreviation": "zod",
            "category": 5,
            "name": "Tapwave Zodiac"
        },
        {
            "id": 68,
            "abbreviation": "colecovision",
            "category": 1,
            "name": "ColecoVision"
        },
        {
            "id": 129,
            "abbreviation": "ti-99",
            "category": 6,
            "name": "Texas Instruments TI-99"
        },
        {
            "id": 134,
            "category": 6,
            "name": "Acorn Electron"
        },
        {
            "id": 378,
            "category": 5,
            "name": "Gamate"
        },
        {
            "id": 135,
            "category": 2,
            "name": "Hyper Neo Geo 64"
        },
        {
            "id": 156,
            "category": 6,
            "name": "Thomson MO5"
        },
        {
            "id": 133,
            "category": 6,
            "name": "Odyssey 2 / Videopac G7000"
        },
        {
            "id": 163,
            "abbreviation": "Steam VR",
            "name": "SteamVR"
        },
        {
            "id": 142,
            "category": 1,
            "name": "PC-50X Family"
        },
        {
            "id": 148,
            "category": 1,
            "name": "AY-3-8607"
        },
        {
            "id": 146,
            "category": 1,
            "name": "AY-3-8605"
        },
        {
            "id": 147,
            "category": 1,
            "name": "AY-3-8606"
        },
        {
            "id": 149,
            "category": 6,
            "name": "PC-98"
        },
        {
            "id": 25,
            "abbreviation": "ACPC",
            "category": 6,
            "name": "Amstrad CPC"
        },
        {
            "id": 381,
            "category": 5,
            "name": "Playdate"
        },
        {
            "id": 51,
            "abbreviation": "fds",
            "category": 1,
            "name": "Family Computer Disk System",
            "platform_family": 5
        },
        {
            "id": 123,
            "category": 5,
            "name": "WonderSwan Color"
        },
        {
            "id": 136,
            "category": 1,
            "name": "Neo Geo CD"
        },
        {
            "id": 35,
            "abbreviation": "Game Gear",
            "category": 5,
            "name": "Sega Game Gear",
            "platform_family": 3
        },
        {
            "id": 62,
            "abbreviation": "Jaguar",
            "category": 1,
            "name": "Atari Jaguar"
        },
        {
            "id": 50,
            "abbreviation": "3DO",
            "category": 1,
            "name": "3DO Interactive Multiplayer"
        },
        {
            "id": 89,
            "abbreviation": "microvision",
            "category": 5,
            "name": "Microvision"
        },
        {
            "id": 128,
            "abbreviation": "supergrafx",
            "category": 1,
            "name": "PC Engine SuperGrafx"
        },
        {
            "id": 150,
            "category": 6,
            "name": "Turbografx-16/PC Engine CD"
        },
        {
            "id": 23,
            "abbreviation": "DC",
            "category": 1,
            "name": "Dreamcast",
            "platform_family": 3
        },
        {
            "id": 65,
            "abbreviation": "Atari8bit",
            "category": 6,
            "name": "Atari 8-bit"
        },
        {
            "id": 70,
            "abbreviation": "vectrex",
            "category": 1,
            "name": "Vectrex"
        },
        {
            "id": 85,
            "abbreviation": "donner30",
            "category": 6,
            "name": "Donner Model 30"
        },
        {
            "id": 97,
            "abbreviation": "pdp-8",
            "category": 6,
            "name": "PDP-8"
        },
        {
            "id": 98,
            "abbreviation": "gt40",
            "name": "DEC GT40"
        },
        {
            "id": 112,
            "abbreviation": "microcomputer",
            "name": "Microcomputer"
        },
        {
            "id": 101,
            "abbreviation": "nimrod",
            "category": 6,
            "name": "Ferranti Nimrod Computer"
        },
        {
            "id": 115,
            "category": 6,
            "name": "Apple IIGS"
        },
        {
            "id": 13,
            "abbreviation": "DOS",
            "category": 4,
            "name": "DOS"
        },
        {
            "id": 124,
            "category": 5,
            "name": "SwanCrystal"
        },
        {
            "id": 127,
            "category": 1,
            "name": "Fairchild Channel F"
        },
        {
            "id": 125,
            "category": 6,
            "name": "PC-8801"
        },
        {
            "id": 87,
            "abbreviation": "virtualboy",
            "category": 1,
            "name": "Virtual Boy",
            "platform_family": 5
        },
        {
            "id": 126,
            "category": 6,
            "name": "TRS-80"
        },
        {
            "id": 130,
            "abbreviation": "Switch",
            "category": 1,
            "name": "Nintendo Switch",
            "platform_family": 5
        },
        {
            "id": 132,
            "category": 3,
            "name": "Amazon Fire TV"
        },
        {
            "id": 138,
            "category": 1,
            "name": "VC 4000"
        },
        {
            "id": 139,
            "category": 1,
            "name": "1292 Advanced Programmable Video System"
        },
        {
            "id": 155,
            "category": 6,
            "name": "Tatung Einstein"
        },
        {
            "id": 159,
            "category": 5,
            "name": "Nintendo DSi",
            "platform_family": 5
        },
        {
            "id": 119,
            "category": 5,
            "name": "Neo Geo Pocket"
        },
        {
            "id": 153,
            "category": 6,
            "name": "Dragon 32/64"
        },
        {
            "id": 154,
            "category": 6,
            "name": "Amstrad PCW"
        },
        {
            "id": 11,
            "abbreviation": "XBOX",
            "category": 1,
            "name": "Xbox",
            "platform_family": 2
        },
        {
            "id": 108,
            "abbreviation": "pdp11",
            "category": 6,
            "name": "PDP-11"
        },
        {
            "id": 53,
            "abbreviation": "MSX2",
            "category": 6,
            "name": "MSX2"
        },
        {
            "id": 60,
            "abbreviation": "Atari7800",
            "category": 1,
            "name": "Atari 7800"
        },
        {
            "id": 78,
            "abbreviation": "segacd",
            "category": 1,
            "name": "Sega CD",
            "platform_family": 3
        },
        {
            "id": 24,
            "abbreviation": "GBA",
            "category": 5,
            "name": "Game Boy Advance",
            "platform_family": 5
        },
        {
            "id": 30,
            "abbreviation": "Sega32",
            "category": 1,
            "name": "Sega 32X",
            "platform_family": 3
        },
        {
            "id": 140,
            "category": 6,
            "name": "AY-3-8500"
        },
        {
            "id": 143,
            "category": 1,
            "name": "AY-3-8760"
        },
        {
            "id": 145,
            "category": 1,
            "name": "AY-3-8603"
        },
        {
            "id": 4,
            "abbreviation": "N64",
            "category": 1,
            "name": "Nintendo 64",
            "platform_family": 5
        },
        {
            "id": 120,
            "category": 5,
            "name": "Neo Geo Pocket Color"
        },
        {
            "id": 41,
            "abbreviation": "WiiU",
            "category": 1,
            "name": "Wii U",
            "platform_family": 5
        },
        {
            "id": 77,
            "abbreviation": "x1",
            "category": 6,
            "name": "Sharp X1"
        },
        {
            "id": 82,
            "abbreviation": "browser",
            "category": 3,
            "name": "Web browser"
        },
        {
            "id": 109,
            "abbreviation": "cdccyber70",
            "category": 6,
            "name": "CDC Cyber 70"
        },
        {
            "id": 113,
            "category": 3,
            "name": "OnLive Game System"
        },
        {
            "id": 116,
            "category": 6,
            "name": "Acorn Archimedes"
        },
        {
            "id": 114,
            "category": 1,
            "name": "Amiga CD32"
        },
        {
            "id": 117,
            "category": 1,
            "name": "Philips CD-i"
        },
        {
            "id": 121,
            "category": 6,
            "name": "Sharp X68000"
        },
        {
            "id": 122,
            "category": 1,
            "name": "Nuon"
        },
        {
            "id": 18,
            "abbreviation": "NES",
            "category": 1,
            "name": "Nintendo Entertainment System",
            "platform_family": 5
        },
        {
            "id": 141,
            "category": 6,
            "name": "AY-3-8610"
        },
        {
            "id": 37,
            "abbreviation": "3DS",
            "category": 5,
            "name": "Nintendo 3DS",
            "platform_family": 5
        },
        {
            "id": 22,
            "abbreviation": "GBC",
            "category": 5,
            "name": "Game Boy Color",
            "platform_family": 5
        },
        {
            "id": 64,
            "abbreviation": "SMS",
            "category": 1,
            "name": "Sega Master System/Mark III",
            "platform_family": 3
        },
        {
            "id": 16,
            "abbreviation": "Amiga",
            "category": 6,
            "name": "Amiga"
        },
        {
            "id": 38,
            "abbreviation": "PSP",
            "category": 5,
            "name": "PlayStation Portable",
            "platform_family": 1
        },
        {
            "id": 86,
            "abbreviation": "turbografx16",
            "category": 1,
            "name": "TurboGrafx-16/PC Engine"
        },
        {
            "id": 162,
            "abbreviation": "Oculus VR",
            "name": "Oculus VR"
        },
        {
            "id": 308,
            "category": 1,
            "name": "Playdia"
        },
        {
            "id": 9,
            "abbreviation": "PS3",
            "category": 1,
            "name": "PlayStation 3",
            "platform_family": 1
        },
        {
            "id": 14,
            "abbreviation": "Mac",
            "category": 4,
            "name": "Mac"
        },
        {
            "id": 306,
            "category": 1,
            "name": "Satellaview",
            "platform_family": 5
        },
        {
            "id": 32,
            "abbreviation": "Saturn",
            "category": 1,
            "name": "Sega Saturn",
            "platform_family": 3
        },
        {
            "id": 34,
            "abbreviation": "Android",
            "category": 4,
            "name": "Android"
        },
        {
            "id": 15,
            "abbreviation": "C64",
            "category": 6,
            "name": "Commodore C64/128/MAX"
        },
        {
            "id": 66,
            "abbreviation": "Atari5200",
            "category": 1,
            "name": "Atari 5200"
        },
        {
            "id": 67,
            "abbreviation": "intellivision",
            "category": 1,
            "name": "Intellivision"
        },
        {
            "id": 73,
            "abbreviation": "blackberry",
            "category": 4,
            "name": "BlackBerry OS"
        },
        {
            "id": 307,
            "category": 5,
            "name": "Game & Watch",
            "platform_family": 5
        },
        {
            "id": 111,
            "abbreviation": "imlac-pds1",
            "name": "Imlac PDS-1"
        },
        {
            "id": 118,
            "category": 6,
            "name": "FM Towns"
        },
        {
            "id": 131,
            "category": 1,
            "name": "Nintendo PlayStation",
            "platform_family": 5
        },
        {
            "id": 157,
            "category": 6,
            "name": "NEC PC-6000 Series"
        },
        {
            "id": 152,
            "category": 6,
            "name": "FM-7"
        },
        {
            "id": 20,
            "abbreviation": "NDS",
            "category": 5,
            "name": "Nintendo DS",
            "platform_family": 5
        },
        {
            "id": 63,
            "abbreviation": "Atari-ST",
            "category": 6,
            "name": "Atari ST/STE"
        },
        {
            "id": 46,
            "abbreviation": "Vita",
            "category": 5,
            "name": "PlayStation Vita",
            "platform_family": 1
        },
        {
            "id": 48,
            "abbreviation": "PS4",
            "category": 1,
            "name": "PlayStation 4",
            "platform_family": 1
        },
        {
            "id": 61,
            "abbreviation": "Lynx",
            "category": 5,
            "name": "Atari Lynx"
        },
        {
            "id": 93,
            "abbreviation": "C16",
            "category": 6,
            "name": "Commodore 16"
        },
        {
            "id": 21,
            "abbreviation": "NGC",
            "category": 1,
            "name": "Nintendo GameCube",
            "platform_family": 5
        },
        {
            "id": 42,
            "abbreviation": "NGage",
            "category": 5,
            "name": "N-Gage"
        },
        {
            "id": 19,
            "abbreviation": "SNES",
            "category": 1,
            "name": "Super Nintendo Entertainment System",
            "platform_family": 5
        },
        {
            "id": 374,
            "category": 6,
            "name": "Sharp MZ-2200"
        },
        {
            "id": 58,
            "abbreviation": "SFAM",
            "category": 1,
            "name": "Super Famicom",
            "platform_family": 5
        },
        {
            "id": 375,
            "category": 1,
            "name": "Epoch Cassette Vision"
        },
        {
            "id": 388,
            "category": 1,
            "name": "Gear VR"
        },
        {
            "id": 96,
            "abbreviation": "pdp10",
            "category": 6,
            "name": "PDP-10"
        },
        {
            "id": 52,
            "abbreviation": "Arcade",
            "name": "Arcade"
        },
        {
            "id": 137,
            "category": 5,
            "name": "New Nintendo 3DS",
            "platform_family": 5
        },
        {
            "id": 377,
            "category": 3,
            "name": "Plug & Play"
        },
        {
            "id": 57,
            "abbreviation": "WonderSwan",
            "category": 5,
            "name": "WonderSwan"
        },
        {
            "id": 71,
            "abbreviation": "vic-20",
            "category": 6,
            "name": "Commodore VIC-20"
        },
        {
            "id": 75,
            "abbreviation": "Apple][",
            "category": 6,
            "name": "Apple II"
        },
        {
            "id": 74,
            "abbreviation": "Win Phone",
            "category": 4,
            "name": "Windows Phone"
        },
        {
            "id": 80,
            "abbreviation": "neogeoaes",
            "category": 1,
            "name": "Neo Geo AES"
        },
        {
            "id": 84,
            "abbreviation": "sg1000",
            "category": 1,
            "name": "SG-1000",
            "platform_family": 3
        },
        {
            "id": 161,
            "name": "Windows Mixed Reality"
        },
        {
            "id": 79,
            "abbreviation": "neogeomvs",
            "category": 2,
            "name": "Neo Geo MVS"
        },
        {
            "id": 33,
            "abbreviation": "Game Boy",
            "category": 5,
            "name": "Game Boy",
            "platform_family": 5
        },
        {
            "id": 376,
            "category": 1,
            "name": "Epoch Super Cassette Vision"
        },
        {
            "id": 5,
            "abbreviation": "Wii",
            "category": 1,
            "name": "Wii",
            "platform_family": 5
        },
        {
            "id": 382,
            "category": 1,
            "name": "Intellivision Amico"
        },
        {
            "id": 170,
            "abbreviation": "Stadia",
            "category": 3,
            "name": "Google Stadia"
        },
        {
            "id": 167,
            "abbreviation": "PS5",
            "category": 1,
            "name": "PlayStation 5",
            "platform_family": 1
        },
        {
            "id": 387,
            "category": 1,
            "name": "Oculus Go"
        },
        {
            "id": 385,
            "category": 1,
            "name": "Oculus Rift"
        },
        {
            "id": 91,
            "abbreviation": "astrocade",
            "category": 1,
            "name": "Bally Astrocade"
        },
        {
            "id": 384,
            "category": 1,
            "name": "Oculus Quest"
        },
        {
            "id": 69,
            "abbreviation": "bbcmicro",
            "category": 6,
            "name": "BBC Microcomputer System"
        },
        {
            "id": 55,
            "abbreviation": "Mobile",
            "category": 5,
            "name": "Legacy Mobile Device"
        },
        {
            "id": 379,
            "category": 5,
            "name": "Game.com"
        },
        {
            "id": 3,
            "abbreviation": "Linux",
            "category": 4,
            "name": "Linux",
            "platform_family": 4
        },
        {
            "id": 72,
            "abbreviation": "Ouya",
            "category": 1,
            "name": "Ouya"
        },
        {
            "id": 95,
            "abbreviation": "pdp1",
            "category": 6,
            "name": "PDP-1"
        },
        {
            "id": 151,
            "category": 6,
            "name": "TRS-80 Color Computer"
        },
        {
            "id": 100,
            "abbreviation": "analogueelectronics",
            "name": "Analogue electronics"
        },
        {
            "id": 166,
            "category": 5,
            "name": "Pokémon mini",
            "platform_family": 5
        },
        {
            "id": 102,
            "abbreviation": "edsac",
            "category": 6,
            "name": "EDSAC"
        },
        {
            "id": 104,
            "abbreviation": "hp2100",
            "category": 6,
            "name": "HP 2100"
        },
        {
            "id": 236,
            "category": 6,
            "name": "Exidy Sorcerer"
        },
        {
            "id": 103,
            "abbreviation": "pdp-7",
            "name": "PDP-7"
        },
        {
            "id": 238,
            "category": 1,
            "name": "DVD Player"
        },
        {
            "id": 105,
            "abbreviation": "hp3000",
            "category": 6,
            "name": "HP 3000"
        },
        {
            "id": 106,
            "abbreviation": "sdssigma7",
            "category": 6,
            "name": "SDS Sigma 7"
        },
        {
            "id": 164,
            "name": "Daydream"
        },
        {
            "id": 107,
            "abbreviation": "call-a-computer",
            "category": 6,
            "name": "Call-A-Computer time-shared mainframe computer system"
        },
        {
            "id": 240,
            "category": 1,
            "name": "Zeebo"
        },
        {
            "id": 110,
            "abbreviation": "plato",
            "category": 6,
            "name": "PLATO"
        },
        {
            "id": 239,
            "category": 1,
            "name": "Blu-ray Player"
        },
        {
            "id": 26,
            "abbreviation": "ZXS",
            "category": 6,
            "name": "ZX Spectrum"
        },
        {
            "id": 274,
            "category": 1,
            "name": "PC-FX"
        },
        {
            "id": 27,
            "abbreviation": "MSX",
            "category": 6,
            "name": "MSX"
        },
        {
            "id": 309,
            "category": 5,
            "name": "Evercade"
        },
        {
            "id": 372,
            "category": 3,
            "name": "OOParts"
        },
        {
            "id": 373,
            "category": 6,
            "name": "Sinclair ZX81"
        },
        {
            "id": 203,
            "name": "DUPLICATE Stadia"
        },
        {
            "id": 380,
            "category": 1,
            "name": "Casio Loopy"
        },
        {
            "id": 169,
            "abbreviation": "Series X",
            "category": 1,
            "name": "Xbox Series X|S",
            "platform_family": 2
        },
        {
            "id": 59,
            "abbreviation": "Atari2600",
            "category": 1,
            "name": "Atari 2600"
        },
        {
            "id": 12,
            "abbreviation": "X360",
            "category": 1,
            "name": "Xbox 360",
            "platform_family": 2
        },
        {
            "id": 49,
            "abbreviation": "XONE",
            "category": 1,
            "name": "Xbox One",
            "platform_family": 2
        },
        {
            "id": 7,
            "abbreviation": "PS1",
            "category": 1,
            "name": "PlayStation",
            "platform_family": 1
        },
        {
            "id": 99,
            "abbreviation": "famicom",
            "category": 1,
            "name": "Family Computer",
            "platform_family": 5
        },
        {
            "id": 389,
            "category": 3,
            "name": "AirConsole"
        },
        {
            "id": 405,
            "category": 4,
            "name": "Windows Mobile"
        },
        {
            "id": 409,
            "category": 6,
            "name": "Legacy Computer"
        },
        {
            "id": 406,
            "category": 6,
            "name": "Sinclair QL"
        },
        {
            "id": 411,
            "category": 5,
            "name": "Handheld Electronic LCD"
        },
        {
            "id": 413,
            "category": 5,
            "name": "Leapster Explorer/LeadPad Explorer"
        },
        {
            "id": 416,
            "category": 1,
            "name": "Nintendo 64DD",
            "platform_family": 5
        },
        {
            "id": 407,
            "category": 1,
            "name": "HyperScan"
        },
        {
            "id": 417,
            "category": 4,
            "name": "Palm OS"
        },
        {
            "id": 408,
            "category": 5,
            "name": "Mega Duck/Cougar Boy"
        },
        {
            "id": 410,
            "category": 1,
            "name": "Atari Jaguar CD"
        },
        {
            "id": 415,
            "category": 5,
            "name": "Watara/QuickShot Supervision"
        },
        {
            "id": 414,
            "category": 1,
            "name": "LeapTV"
        },
        {
            "id": 412,
            "category": 5,
            "name": "Leapster"
        },
        {
            "id": 438,
            "category": 5,
            "name": "Arduboy"
        },
        {
            "id": 439,
            "category": 1,
            "name": "V.Smile"
        },
        {
            "id": 440,
            "category": 5,
            "name": "Visual Memory Unit / Visual Memory System",
            "platform_family": 3
        },
        {
            "id": 441,
            "category": 5,
            "name": "PocketStation",
            "platform_family": 1
        },
        {
            "id": 29,
            "abbreviation": "Genesis/MegaDrive",
            "category": 1,
            "name": "Sega Mega Drive/Genesis",
            "platform_family": 3
        },
        {
            "id": 386,
            "abbreviation": "Meta Quest 2",
            "category": 1,
            "name": "Meta Quest 2"
        },
        {
            "id": 390,
            "abbreviation": "PSVR2",
            "category": 1,
            "name": "PlayStation VR2",
            "platform_family": 1
        },
        {
            "id": 165,
            "abbreviation": "PlayStation VR",
            "category": 1,
            "name": "PlayStation VR",
            "platform_family": 1
        },
        {
            "id": 47,
            "abbreviation": "VC",
            "category": 3,
            "name": "Virtual Console",
            "platform_family": 5
        },
        {
            "id": 471,
            "category": 1,
            "name": "Meta Quest 3"
        }
    ]

export const commonPlatforms = ["PC","PlayStation 5", "Xbox Series X|S", "Nintendo Switch", "PC (Microsoft Windows)"]
export const getPlatformsByCategory = (category: PlatformCategory): IPlatform[] =>
   platforms.filter((platform) => platform.category === category);

export const getCommonPlatforms = () =>    platforms.filter((platform) => commonPlatforms.includes(platform.name ?? ""));

// We do 'platform.category && ...' to make sure its not undefined
export const getPlatformByCategories = (categories: PlatformCategory[]): IPlatform[] =>
    platforms.filter((platform) => platform.category && categories.includes(platform.category));
    
export const getPlatformByAbbreviation = function (abbreviation: string): IPlatform | undefined {
    try {
        const platform = platforms.find((platform) => platform.abbreviation === abbreviation.toUpperCase());

        if (!platform) {
            throw new Error(`Platform with abbreviation "${abbreviation}" not found.`);
        }

        return platform;
    } catch (error) {
        console.error('Error in getPlatformByAbbreviation:', error);
        return undefined;
    }
}
export const getAllPlatforms = (): IPlatform[] => platforms;