const EMBEDDED_ICONS = {"play":{"viewBox":"0 0 24 24","body":"<path d=\"M4 11.9999V8.43989C4 4.01989 7.13 2.2099 10.96 4.4199L14.05 6.1999L17.14 7.9799C20.97 10.1899 20.97 13.8099 17.14 16.0199L14.05 17.7999L10.96 19.5799C7.13 21.7899 4 19.9799 4 15.5599V11.9999Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"pause":{"viewBox":"0 0 24 24","body":"<path d=\"M10.5 19.9V4.1C10.5 2.6 9.86 2 8.27 2H4.23C2.64 2 2 2.6 2 4.1V19.9C2 21.4 2.64 22 4.23 22H8.27C9.86 22 10.5 21.4 10.5 19.9Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M22 19.9V4.1C22 2.6 21.36 2 19.77 2H15.73C14.14 2 13.5 2.6 13.5 4.1V19.9C13.5 21.4 14.14 22 15.73 22H19.77C21.36 22 22 21.4 22 19.9Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"playMini":{"viewBox":"0 0 24 24","body":"<path d=\"M9.09998 12V10.52C9.09998 8.60999 10.45 7.83999 12.1 8.78999L13.38 9.52999L14.66 10.27C16.31 11.22 16.31 12.78 14.66 13.73L13.38 14.47L12.1 15.21C10.45 16.16 9.09998 15.38 9.09998 13.48V12Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"pauseMini":{"viewBox":"0 0 24 24","body":"<path d=\"M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44712 2 1.96997 6.47715 1.96997 12C1.96997 17.5228 6.44712 22 11.97 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M10.72 14.53V9.47005C10.72 8.99005 10.52 8.80005 10.01 8.80005H8.71C8.2 8.80005 8 8.99005 8 9.47005V14.53C8 15.01 8.2 15.2 8.71 15.2H10C10.52 15.2 10.72 15.01 10.72 14.53Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M16 14.53V9.47005C16 8.99005 15.8 8.80005 15.29 8.80005H14C13.49 8.80005 13.29 8.99005 13.29 9.47005V14.53C13.29 15.01 13.49 15.2 14 15.2H15.29C15.8 15.2 16 15.01 16 14.53Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"playMiniPlayer":{"viewBox":"0 0 24 24","body":"<path d=\"M9.09998 12V10.52C9.09998 8.60999 10.45 7.83999 12.1 8.78999L13.38 9.52999L14.66 10.27C16.31 11.22 16.31 12.78 14.66 13.73L13.38 14.47L12.1 15.21C10.45 16.16 9.09998 15.38 9.09998 13.48V12Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"pauseMiniPlayer":{"viewBox":"0 0 24 24","body":"<path d=\"M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44712 2 1.96997 6.47715 1.96997 12C1.96997 17.5228 6.44712 22 11.97 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M10.72 14.53V9.47005C10.72 8.99005 10.52 8.80005 10.01 8.80005H8.71C8.2 8.80005 8 8.99005 8 9.47005V14.53C8 15.01 8.2 15.2 8.71 15.2H10C10.52 15.2 10.72 15.01 10.72 14.53Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M16 14.53V9.47005C16 8.99005 15.8 8.80005 15.29 8.80005H14C13.49 8.80005 13.29 8.99005 13.29 9.47005V14.53C13.29 15.01 13.49 15.2 14 15.2H15.29C15.8 15.2 16 15.01 16 14.53Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"previous":{"viewBox":"0 0 24 24","body":"<path d=\"M20.24 7.22005V16.7901C20.24 18.7501 18.11 19.98 16.41 19L12.26 16.61L8.10996 14.21C6.40996 13.23 6.40996 10.78 8.10996 9.80004L12.26 7.40004L16.41 5.01006C18.11 4.03006 20.24 5.25005 20.24 7.22005Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3.76001 18.1801V5.82007\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"next":{"viewBox":"0 0 24 24","body":"<path d=\"M3.76001 7.22005V16.7901C3.76001 18.7501 5.89 19.98 7.59 19L11.74 16.61L15.89 14.21C17.59 13.23 17.59 10.78 15.89 9.80004L11.74 7.40004L7.59 5.01006C5.89 4.03006 3.76001 5.25005 3.76001 7.22005Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M20.24 18.1801V5.82007\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"previousMini":{"viewBox":"0 0 24 24","body":"<path d=\"M17.9999 12.0001V14.6701C17.9999 17.9801 15.6499 19.3401 12.7799 17.6801L10.4699 16.3401L8.15995 15.0001C5.28995 13.3401 5.28995 10.6301 8.15995 8.97005L10.4699 7.63005L12.7799 6.29005C15.6499 4.66005 17.9999 6.01005 17.9999 9.33005V12.0001Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"nextMini":{"viewBox":"0 0 24 24","body":"<path d=\"M6 11.9999V9.32992C6 6.01992 8.35 4.65992 11.22 6.31992L13.53 7.65992L15.84 8.99992C18.71 10.6599 18.71 13.3699 15.84 15.0299L13.53 16.3699L11.22 17.7099C8.35 19.3399 6 17.9899 6 14.6699V11.9999Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"previousFloating":{"viewBox":"0 0 24 24","body":"<path d=\"M22 8.33994V15.6599C22 17.1599 20.37 18.0999 19.07 17.3499L15.9 15.5299L12.73 13.7C12.53 13.58 12.37 13.45 12.24 13.29V10.73C12.37 10.57 12.53 10.44 12.73 10.32L15.9 8.48993L19.07 6.66996C20.37 5.89996 22 6.83994 22 8.33994Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12.24 8.33994V15.6599C12.24 17.1599 10.61 18.0999 9.30999 17.3499L6.14001 15.5299L2.97 13.7C1.67 12.95 1.67 11.08 2.97 10.32L6.14001 8.48993L9.30999 6.66996C10.61 5.89996 12.24 6.83994 12.24 8.33994Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"nextFloating":{"viewBox":"0 0 24 24","body":"<path d=\"M2 8.33994V15.6599C2 17.1599 3.62999 18.0999 4.92999 17.3499L8.10001 15.5299L11.27 13.7C11.47 13.58 11.63 13.45 11.76 13.29V10.73C11.63 10.57 11.47 10.44 11.27 10.32L8.10001 8.48993L4.92999 6.66996C3.62999 5.89996 2 6.83994 2 8.33994Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M11.76 8.33994V15.6599C11.76 17.1599 13.39 18.0999 14.69 17.3499L17.86 15.5299L21.03 13.7C22.33 12.95 22.33 11.08 21.03 10.32L17.86 8.48993L14.69 6.66996C13.39 5.89996 11.76 6.83994 11.76 8.33994Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"search":{"viewBox":"0 0 24 24","body":"<path d=\"M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M22 22L20 20\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"options":{"viewBox":"0 0 24 24","body":"<path d=\"M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/>\n<path d=\"M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/>\n<path d=\"M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/>"},"menu":{"viewBox":"0 0 24 24","body":"<path d=\"M3 7H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n<path d=\"M3 12H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n<path d=\"M3 17H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>"},"home":{"viewBox":"0 0 24 24","body":"<path d=\"M12 18V15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"tracks":{"viewBox":"0 0 24 24","body":"<path d=\"M7.96997 22C10.1791 22 11.97 20.2091 11.97 18C11.97 15.7909 10.1791 14 7.96997 14C5.76083 14 3.96997 15.7909 3.96997 18C3.96997 20.2091 5.76083 22 7.96997 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M11.97 18V4\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M14.61 2.11L19.03 3.58C20.1 3.94 20.98 5.15 20.98 6.28V7.45C20.98 8.98 19.8 9.83 18.35 9.35L13.93 7.88C12.86 7.52 11.98 6.31 11.98 5.18V4C11.97 2.48 13.16 1.62 14.61 2.11Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"albums":{"viewBox":"0 0 24 24","body":"<path d=\"M13.01 2.92007L18.91 5.54007C20.61 6.29007 20.61 7.53007 18.91 8.28007L13.01 10.9001C12.34 11.2001 11.24 11.2001 10.57 10.9001L4.67 8.28007C2.97 7.53007 2.97 6.29007 4.67 5.54007L10.57 2.92007C11.24 2.62007 12.34 2.62007 13.01 2.92007Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3 11C3 11.84 3.63 12.81 4.4 13.15L11.19 16.17C11.71 16.4 12.3 16.4 12.81 16.17L19.6 13.15C20.37 12.81 21 11.84 21 11\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3 16C3 16.93 3.55 17.77 4.4 18.15L11.19 21.17C11.71 21.4 12.3 21.4 12.81 21.17L19.6 18.15C20.45 17.77 21 16.93 21 16\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"artists":{"viewBox":"0 0 24 24","body":"<path d=\"M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"genres":{"viewBox":"0 0 24 24","body":"<path d=\"M19.07 4.95008C23.04 8.92008 22.97 15.4 18.87 19.29C15.08 22.88 8.92996 22.88 5.12996 19.29C1.01996 15.4 0.94995 8.92008 4.92995 4.95008C8.82995 1.04008 15.17 1.04008 19.07 4.95008Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M15.8399 16.0701C13.7199 18.0701 10.2799 18.0701 8.16992 16.0701\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"playlists":{"viewBox":"0 0 24 24","body":"<path d=\"M17 22H7C4 22 2 20.5 2 17V12C2 8.5 4 7 7 7H17C20 7 22 8.5 22 12V17C22 20.5 20 22 17 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M6 4.5H18\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M9 2H15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M8.89001 19.1099C9.64664 19.1099 10.26 18.4965 10.26 17.7399C10.26 16.9832 9.64664 16.3699 8.89001 16.3699C8.13338 16.3699 7.52002 16.9832 7.52002 17.7399C7.52002 18.4965 8.13338 19.1099 8.89001 19.1099Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M15.28 16.83V11.4799C15.28 10.3399 14.57 10.18 13.84 10.38L11.1 11.13C10.6 11.27 10.26 11.6599 10.26 12.2299V13.18V13.82V17.74\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M13.91 18.2C14.6667 18.2 15.2801 17.5866 15.2801 16.83C15.2801 16.0733 14.6667 15.46 13.91 15.46C13.1534 15.46 12.54 16.0733 12.54 16.83C12.54 17.5866 13.1534 18.2 13.91 18.2Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M10.26 13.83L15.28 12.46\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"queue":{"viewBox":"0 0 24 24","body":"<path d=\"M19.9 13.5H4.1C2.6 13.5 2 14.14 2 15.73V19.77C2 21.36 2.6 22 4.1 22H19.9C21.4 22 22 21.36 22 19.77V15.73C22 14.14 21.4 13.5 19.9 13.5Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M19.9 2H4.1C2.6 2 2 2.64 2 4.23V8.27C2 9.86 2.6 10.5 4.1 10.5H19.9C21.4 10.5 22 9.86 22 8.27V4.23C22 2.64 21.4 2 19.9 2Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"folders":{"viewBox":"0 0 24 24","body":"<path d=\"M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\"/>"},"favorites":{"viewBox":"0 0 24 24","body":"<path d=\"M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"favourites":{"viewBox":"0 0 24 24","body":"<path d=\"M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"favourite":{"viewBox":"0 0 24 24","body":"<path d=\"M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"settings":{"viewBox":"0 0 24 24","body":"<path d=\"M3 9.11011V14.8801C3 17.0001 3 17.0001 5 18.3501L10.5 21.5301C11.33 22.0101 12.68 22.0101 13.5 21.5301L19 18.3501C21 17.0001 21 17.0001 21 14.8901V9.11011C21 7.00011 21 7.00011 19 5.65011L13.5 2.47011C12.68 1.99011 11.33 1.99011 10.5 2.47011L5 5.65011C3 7.00011 3 7.00011 3 9.11011Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"shuffle":{"viewBox":"0 0 24 24","body":"<path d=\"M3 17.9799L5.54999 17.9899C6.45999 17.9899 7.31 17.5399 7.81 16.7899L14.2 7.20994C14.7 6.45994 15.55 5.99993 16.46 6.00993L21.01 6.02994\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M19 19.98L21 17.98\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M8.89001 8.61993L7.81 7.11993C7.3 6.40993 6.47999 5.98993 5.60999 5.99993L3 6.00994\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12.97 15.3799L14.19 16.9499C14.7 17.6099 15.5 17.9999 16.34 17.9999L21.01 17.9799\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M21 6.02002L19 4.02002\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"play-mini":{"viewBox":"0 0 24 24","body":"<path d=\"M9.09998 12V10.52C9.09998 8.60999 10.45 7.83999 12.1 8.78999L13.38 9.52999L14.66 10.27C16.31 11.22 16.31 12.78 14.66 13.73L13.38 14.47L12.1 15.21C10.45 16.16 9.09998 15.38 9.09998 13.48V12Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"next-mini":{"viewBox":"0 0 24 24","body":"<path d=\"M6 11.9999V9.32992C6 6.01992 8.35 4.65992 11.22 6.31992L13.53 7.65992L15.84 8.99992C18.71 10.6599 18.71 13.3699 15.84 15.0299L13.53 16.3699L11.22 17.7099C8.35 19.3399 6 17.9899 6 14.6699V11.9999Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"previous-mini":{"viewBox":"0 0 24 24","body":"<path d=\"M17.9999 12.0001V14.6701C17.9999 17.9801 15.6499 19.3401 12.7799 17.6801L10.4699 16.3401L8.15995 15.0001C5.28995 13.3401 5.28995 10.6301 8.15995 8.97005L10.4699 7.63005L12.7799 6.29005C15.6499 4.66005 17.9999 6.01005 17.9999 9.33005V12.0001Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"next-floating":{"viewBox":"0 0 24 24","body":"<path d=\"M2 8.33994V15.6599C2 17.1599 3.62999 18.0999 4.92999 17.3499L8.10001 15.5299L11.27 13.7C11.47 13.58 11.63 13.45 11.76 13.29V10.73C11.63 10.57 11.47 10.44 11.27 10.32L8.10001 8.48993L4.92999 6.66996C3.62999 5.89996 2 6.83994 2 8.33994Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M11.76 8.33994V15.6599C11.76 17.1599 13.39 18.0999 14.69 17.3499L17.86 15.5299L21.03 13.7C22.33 12.95 22.33 11.08 21.03 10.32L17.86 8.48993L14.69 6.66996C13.39 5.89996 11.76 6.83994 11.76 8.33994Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"previous-floating":{"viewBox":"0 0 24 24","body":"<path d=\"M22 8.33994V15.6599C22 17.1599 20.37 18.0999 19.07 17.3499L15.9 15.5299L12.73 13.7C12.53 13.58 12.37 13.45 12.24 13.29V10.73C12.37 10.57 12.53 10.44 12.73 10.32L15.9 8.48993L19.07 6.66996C20.37 5.89996 22 6.83994 22 8.33994Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12.24 8.33994V15.6599C12.24 17.1599 10.61 18.0999 9.30999 17.3499L6.14001 15.5299L2.97 13.7C1.67 12.95 1.67 11.08 2.97 10.32L6.14001 8.48993L9.30999 6.66996C10.61 5.89996 12.24 6.83994 12.24 8.33994Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"repeatNone":{"viewBox":"0 0 24 24","body":"<path d=\"M14 3L16.44 5.34003L8.48999 5.32001C4.91999 5.32001 1.98999 8.25003 1.98999 11.84C1.98999 13.63 2.71998 15.26 3.89998 16.44\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M10.0001 21.0001L7.56006 18.66L15.5101 18.6801C19.0801 18.6801 22.0101 15.75 22.0101 12.16C22.0101 10.37 21.2801 8.74006 20.1001 7.56006\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M9 12H15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"repeatAll":{"viewBox":"0 0 24 24","body":"<path d=\"M14 3L16.44 5.34003L8.48999 5.32001C4.91999 5.32001 1.98999 8.25003 1.98999 11.84C1.98999 13.63 2.71998 15.26 3.89998 16.44\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M10.0001 21.0001L7.56006 18.66L15.5101 18.6801C19.0801 18.6801 22.0101 15.75 22.0101 12.16C22.0101 10.37 21.2801 8.74006 20.1001 7.56006\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"repeatOne":{"viewBox":"0 0 24 24","body":"<path d=\"M14 3L16.44 5.34003L8.48999 5.32001C4.91999 5.32001 1.98999 8.25003 1.98999 11.84C1.98999 13.63 2.71999 15.26 3.89999 16.44\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M10.0001 21.0001L7.56006 18.66L15.5101 18.6801C19.0801 18.6801 22.0101 15.75 22.0101 12.16C22.0101 10.37 21.2801 8.74006 20.1001 7.56006\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12.25 14.67V9.33008L10.75 11.0001\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"repeatN":{"viewBox":"0 0 24 24","body":"<path d=\"M7.5 8.33997H14.9C15.79 8.33997 16.5 9.05994 16.5 9.93994V11.71\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M9.19 6.65991L7.5 8.33997L9.19 10.03\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M16.5 15.6599H9.10001C8.21001 15.6599 7.5 14.9399 7.5 14.0599V12.2899\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M14.8101 17.34L16.5001 15.66L14.8101 13.97\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"repeat":{"viewBox":"0 0 24 24","body":"<path d=\"M14 3L16.44 5.34003L8.48999 5.32001C4.91999 5.32001 1.98999 8.25003 1.98999 11.84C1.98999 13.63 2.71998 15.26 3.89998 16.44\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M10.0001 21.0001L7.56006 18.66L15.5101 18.6801C19.0801 18.6801 22.0101 15.75 22.0101 12.16C22.0101 10.37 21.2801 8.74006 20.1001 7.56006\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M9 12H15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"none":{"viewBox":"0 0 24 24","body":"<path d=\"M14 3L16.44 5.34003L8.48999 5.32001C4.91999 5.32001 1.98999 8.25003 1.98999 11.84C1.98999 13.63 2.71998 15.26 3.89998 16.44\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M10.0001 21.0001L7.56006 18.66L15.5101 18.6801C19.0801 18.6801 22.0101 15.75 22.0101 12.16C22.0101 10.37 21.2801 8.74006 20.1001 7.56006\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M9 12H15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"lightMode":{"viewBox":"0 0 24 24","body":"<path d=\"M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"darkMode":{"viewBox":"0 0 24 24","body":"<path d=\"M2.03009 12.42C2.39009 17.57 6.76009 21.76 11.9901 21.99C15.6801 22.15 18.9801 20.43 20.9601 17.72C21.7801 16.61 21.3401 15.87 19.9701 16.12C19.3001 16.24 18.6101 16.29 17.8901 16.26C13.0001 16.06 9.00009 11.97 8.98009 7.13996C8.97009 5.83996 9.24009 4.60996 9.73009 3.48996C10.2701 2.24996 9.62009 1.65996 8.37009 2.18996C4.41009 3.85996 1.70009 7.84996 2.03009 12.42Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"theme":{"viewBox":"0 0 24 24","body":"<path d=\"M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M8.35 1.94995L9.69 3.28992\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M2.07 11.92L17.19 11.26\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3 22H16\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"share":{"viewBox":"0 0 24 24","body":"<path d=\"M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M10.11 13.6501L13.69 10.0601\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"addPlaylist":{"viewBox":"0 0 24 24","body":"<path d=\"M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M8 12H16\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 16V8\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"add-playlist":{"viewBox":"0 0 24 24","body":"<path d=\"M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M8 12H16\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 16V8\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"addPlayNext":{"viewBox":"0 0 24 24","body":"<path d=\"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M8.5 12H14.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12.5 15L15.5 12L12.5 9\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"remove":{"viewBox":"0 0 24 24","body":"<path d=\"M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M10.33 16.5H13.66\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M9.5 12.5H14.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"select":{"viewBox":"0 0 24 24","body":"<path d=\"M11 19.5H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M11 12.5H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M11 5.5H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3 5.5L4 6.5L7 3.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3 12.5L4 13.5L7 10.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3 19.5L4 20.5L7 17.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"sort":{"viewBox":"0 0 24 24","body":"<path d=\"M3 7H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n<path d=\"M6 12H18\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n<path d=\"M10 17H14\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>"},"sortPlaylist":{"viewBox":"0 -4 28 28","body":"<title>bullet-list</title>\n    <desc>Created with Sketch Beta.</desc>\n    <defs>\n\n</defs>\n    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Icon-Set\" sketch:type=\"MSLayerGroup\" transform=\"translate(-570.000000, -209.000000)\" fill=\"currentColor\">\n            <path d=\"M597,226 L579,226 C578.447,226 578,226.448 578,227 C578,227.553 578.447,228 579,228 L597,228 C597.553,228 598,227.553 598,227 C598,226.448 597.553,226 597,226 L597,226 Z M572,209 C570.896,209 570,209.896 570,211 C570,212.104 570.896,213 572,213 C573.104,213 574,212.104 574,211 C574,209.896 573.104,209 572,209 L572,209 Z M579,212 L597,212 C597.553,212 598,211.553 598,211 C598,210.447 597.553,210 597,210 L579,210 C578.447,210 578,210.447 578,211 C578,211.553 578.447,212 579,212 L579,212 Z M597,218 L579,218 C578.447,218 578,218.448 578,219 C578,219.553 578.447,220 579,220 L597,220 C597.553,220 598,219.553 598,219 C598,218.448 597.553,218 597,218 L597,218 Z M572,217 C570.896,217 570,217.896 570,219 C570,220.104 570.896,221 572,221 C573.104,221 574,220.104 574,219 C574,217.896 573.104,217 572,217 L572,217 Z M572,225 C570.896,225 570,225.896 570,227 C570,228.104 570.896,229 572,229 C573.104,229 574,228.104 574,227 C574,225.896 573.104,225 572,225 L572,225 Z\" id=\"bullet-list\" sketch:type=\"MSShapeGroup\">\n\n</path>\n        </g>\n    </g>"},"grid":{"viewBox":"0 0 24 24","body":"<path d=\"M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 2V22\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M2 9.5H12\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 14.5H22\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"scanner":{"viewBox":"0 0 24 24","body":"<path d=\"M2 9V7C2 4 4 2 7 2H17C20 2 22 4 22 7V9\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M2 15V17C2 20 4 22 7 22H17C20 22 22 20 22 17V15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M2 12H22\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"warning":{"viewBox":"0 0 24 24","body":"<path d=\"M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 8V13\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M11.9945 16H12.0035\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"lyrics":{"viewBox":"0 0 24 24","body":"<path d=\"M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M15.75 9H8.25\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M15.75 15H8.25\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"equalizer":{"viewBox":"0 0 24 24","body":"<path d=\"M19 22V11\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M19 7V2\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 22V17\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 13V2\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M5 22V11\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M5 7V2\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3 11H7\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M17 11H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M10 13H14\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"pitchSpeed":{"viewBox":"0 0 24 24","body":"<path d=\"M3 8.25V15.75\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M7.5 5.75V18.25\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 3.25V20.75\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M16.5 5.75V18.25\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M21 8.25V15.75\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"volumeBoost":{"viewBox":"0 0 24 24","body":"<path d=\"M15.7199 9.69002C17.7799 11.75 17.7799 15.08 15.7199 17.13C13.6599 19.19 10.3299 19.19 8.27986 17.13C6.21986 15.07 6.21986 11.74 8.27986 9.69002C10.3299 7.63002 13.6699 7.63002 15.7199 9.69002Z\" stroke=\"currentColor\" stroke-width=\"1.5093\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M11.9999 13.4099L10.4099 14.9999\" stroke=\"currentColor\" stroke-width=\"1.5093\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M19.0701 6.33997C19.2201 6.48997 19.2201 6.73997 19.0701 6.89997C18.9201 7.04997 18.6701 7.04997 18.5101 6.89997C18.3501 6.74997 18.3601 6.49997 18.5101 6.33997C18.6601 6.17997 18.9201 6.17997 19.0701 6.33997Z\" stroke=\"currentColor\" stroke-miterlimit=\"10\"/>\n<path d=\"M19.0701 6.33997C19.2201 6.48997 19.2201 6.73997 19.0701 6.89997C18.9201 7.04997 18.6701 7.04997 18.5101 6.89997C18.3501 6.74997 18.3601 6.49997 18.5101 6.33997C18.6601 6.17997 18.9201 6.17997 19.0701 6.33997Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M5.48988 19.92C5.63988 20.07 5.63988 20.32 5.48988 20.48C5.33988 20.64 5.08988 20.63 4.92988 20.48C4.77988 20.33 4.77988 20.08 4.92988 19.92C5.07988 19.76 5.33988 19.76 5.48988 19.92Z\" stroke=\"currentColor\" stroke-miterlimit=\"10\"/>\n<path d=\"M5.48988 19.92C5.63988 20.07 5.63988 20.32 5.48988 20.48C5.33988 20.64 5.08988 20.63 4.92988 20.48C4.77988 20.33 4.77988 20.08 4.92988 19.92C5.07988 19.76 5.33988 19.76 5.48988 19.92Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M21.8799 13.13C22.0299 13.28 22.0299 13.53 21.8799 13.69C21.7299 13.84 21.4799 13.84 21.3199 13.69C21.1599 13.54 21.1699 13.29 21.3199 13.13C21.4699 12.97 21.7299 12.97 21.8799 13.13Z\" stroke=\"currentColor\" stroke-miterlimit=\"10\"/>\n<path d=\"M21.8799 13.13C22.0299 13.28 22.0299 13.53 21.8799 13.69C21.7299 13.84 21.4799 13.84 21.3199 13.69C21.1599 13.54 21.1699 13.29 21.3199 13.13C21.4699 12.97 21.7299 12.97 21.8799 13.13Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M2.67009 13.13C2.82009 13.28 2.82009 13.53 2.67009 13.69C2.52009 13.85 2.27006 13.84 2.11006 13.69C1.96006 13.54 1.96006 13.29 2.11006 13.13C2.27006 12.97 2.52009 12.97 2.67009 13.13Z\" stroke=\"currentColor\" stroke-miterlimit=\"10\"/>\n<path d=\"M2.67009 13.13C2.82009 13.28 2.82009 13.53 2.67009 13.69C2.52009 13.85 2.27006 13.84 2.11006 13.69C1.96006 13.54 1.96006 13.29 2.11006 13.13C2.27006 12.97 2.52009 12.97 2.67009 13.13Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M19.0701 19.92C19.2201 20.07 19.2201 20.32 19.0701 20.48C18.9201 20.63 18.6701 20.63 18.5101 20.48C18.3501 20.33 18.3601 20.08 18.5101 19.92C18.6701 19.76 18.9201 19.76 19.0701 19.92Z\" stroke=\"currentColor\" stroke-miterlimit=\"10\"/>\n<path d=\"M19.0701 19.92C19.2201 20.07 19.2201 20.32 19.0701 20.48C18.9201 20.63 18.6701 20.63 18.5101 20.48C18.3501 20.33 18.3601 20.08 18.5101 19.92C18.6701 19.76 18.9201 19.76 19.0701 19.92Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M5.48988 6.33997C5.63988 6.48997 5.63988 6.73997 5.48988 6.89997C5.33988 7.05997 5.08988 7.04997 4.92988 6.89997C4.77988 6.74997 4.77988 6.49997 4.92988 6.33997C5.07988 6.17997 5.33988 6.17997 5.48988 6.33997Z\" stroke=\"currentColor\" stroke-miterlimit=\"10\"/>\n<path d=\"M5.48988 6.33997C5.63988 6.48997 5.63988 6.73997 5.48988 6.89997C5.33988 7.05997 5.08988 7.04997 4.92988 6.89997C4.77988 6.74997 4.77988 6.49997 4.92988 6.33997C5.07988 6.17997 5.33988 6.17997 5.48988 6.33997Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12.28 3.52009C12.43 3.67009 12.43 3.92009 12.28 4.08009C12.13 4.24009 11.88 4.23009 11.72 4.08009C11.56 3.93009 11.57 3.68009 11.72 3.52009C11.87 3.36009 12.13 3.37009 12.28 3.52009Z\" stroke=\"currentColor\" stroke-miterlimit=\"10\"/>\n<path d=\"M12.28 3.52009C12.43 3.67009 12.43 3.92009 12.28 4.08009C12.13 4.24009 11.88 4.23009 11.72 4.08009C11.56 3.93009 11.57 3.68009 11.72 3.52009C11.87 3.36009 12.13 3.37009 12.28 3.52009Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"sleepTimer":{"viewBox":"0 0 24 24","body":"<path d=\"M20.75 13.25C20.75 18.08 16.83 22 12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 8V13\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M9 2H15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"pauseSleep":{"viewBox":"0 0 24 24","body":"<path d=\"M12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 8V13\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M9 2H15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M19 17V21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M16 17V21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"resumeSleep":{"viewBox":"0 0 24 24","body":"<path d=\"M12 8V13\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M9 2H15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M14.9 18.5V17.34C14.9 15.91 15.92 15.32 17.16 16.04L18.16 16.62L19.16 17.2C20.4 17.92 20.4 19.09 19.16 19.81L18.16 20.39L17.16 20.97C15.92 21.69 14.9 21.1 14.9 19.67V18.5Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"repeatSection":{"viewBox":"0 0 24 24","body":"<path d=\"M19 16V6.5C19 5.4 18.1 4.5 17 4.5H11.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M14 2L11 4.5L14 7\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M19 22C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16C17.3431 16 16 17.3431 16 19C16 20.6569 17.3431 22 19 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M5 8V17.5C5 18.6 5.9 19.5 7 19.5H12.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M10 22L13 19.5L10 17\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M5 8C6.65685 8 8 6.65685 8 5C8 3.34315 6.65685 2 5 2C3.34315 2 2 3.34315 2 5C2 6.65685 3.34315 8 5 8Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"playAfterSeconds":{"viewBox":"0 0 24 24","body":"<path d=\"M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44712 2 1.96997 6.47715 1.96997 12C1.96997 17.5228 6.44712 22 11.97 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M8.73999 12.2299V10.5599C8.73999 8.47988 10.21 7.62988 12.01 8.66988L13.46 9.50988L14.91 10.3499C16.71 11.3899 16.71 13.0899 14.91 14.1299L13.46 14.9699L12.01 15.8099C10.21 16.8499 8.73999 15.9999 8.73999 13.9199V12.2299Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"playAfterTracks":{"viewBox":"0 0 24 24","body":"<path d=\"M19 16V6.5C19 5.4 18.1 4.5 17 4.5H12.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M15 2L12 4.5L15 7\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M5 9V16\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M5.25 8.5C7.04493 8.5 8.5 7.04493 8.5 5.25C8.5 3.45507 7.04493 2 5.25 2C3.45507 2 2 3.45507 2 5.25C2 7.04493 3.45507 8.5 5.25 8.5Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M5 22C6.65685 22 8 20.6569 8 19C8 17.3431 6.65685 16 5 16C3.34315 16 2 17.3431 2 19C2 20.6569 3.34315 22 5 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M19 22C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16C17.3431 16 16 17.3431 16 19C16 20.6569 17.3431 22 19 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"playAlbumAfterTrack":{"viewBox":"0 0 24 24","body":"<path d=\"M5.46997 9C7.40297 9 8.96997 7.433 8.96997 5.5C8.96997 3.567 7.40297 2 5.46997 2C3.53697 2 1.96997 3.567 1.96997 5.5C1.96997 7.433 3.53697 9 5.46997 9Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/>\n<path d=\"M16.97 15H19.97C21.07 15 21.97 15.9 21.97 17V20C21.97 21.1 21.07 22 19.97 22H16.97C15.87 22 14.97 21.1 14.97 20V17C14.97 15.9 15.87 15 16.97 15Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/>\n<path d=\"M11.9999 5H14.6799C16.5299 5 17.3899 7.29 15.9999 8.51L8.00995 15.5C6.61995 16.71 7.47994 19 9.31994 19H11.9999\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M5.48622 5.5H5.49777\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M18.4862 18.5H18.4978\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"comments":{"viewBox":"0 0 24 24","body":"<path d=\"M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M15.9965 11H16.0054\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M11.9955 11H12.0045\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M7.99451 11H8.00349\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"metadata":{"viewBox":"0 0 24 24","body":"<path d=\"M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12.91 7.83991L7.72004 13.0299C7.52004 13.2299 7.33004 13.6199 7.29004 13.8999L7.01004 15.8799C6.91004 16.5999 7.41004 17.0999 8.13004 16.9999L10.11 16.7199C10.39 16.6799 10.78 16.4899 10.98 16.2899L16.17 11.0999C17.06 10.2099 17.49 9.16991 16.17 7.84991C14.85 6.51991 13.81 6.93991 12.91 7.83991Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12.17 8.57983C12.61 10.1498 13.84 11.3898 15.42 11.8298\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"youtube":{"viewBox":"0 0 24 24","body":"<path d=\"M14.99 17.5H16.5C19.52 17.5 22 15.03 22 12C22 8.98 19.53 6.5 16.5 6.5H14.99\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M9 6.5H7.5C4.47 6.5 2 8.97 2 12C2 15.02 4.47 17.5 7.5 17.5H9\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M8 12H16\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"favoriteArtist":{"viewBox":"0 0 24 24","body":"<path d=\"M14.4399 19.05L15.9599 20.57L18.9999 17.53\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.44997 10.79 7.55997 8.84 7.55997 6.44C7.54997 3.99 9.53997 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.43 8.84 14.53 10.79 12.16 10.87Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M11.99 21.8101C10.17 21.8101 8.36004 21.3501 6.98004 20.4301C4.56004 18.8101 4.56004 16.1701 6.98004 14.5601C9.73004 12.7201 14.24 12.7201 16.99 14.5601\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"playOnly":{"viewBox":"0 0 24 24","body":"<path d=\"M5 9V16\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M5.25 8.5C7.04493 8.5 8.5 7.04493 8.5 5.25C8.5 3.45507 7.04493 2 5.25 2C3.45507 2 2 3.45507 2 5.25C2 7.04493 3.45507 8.5 5.25 8.5Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M5 22C6.65685 22 8 20.6569 8 19C8 17.3431 6.65685 16 5 16C3.34315 16 2 17.3431 2 19C2 20.6569 3.34315 22 5 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M19 22C20.6569 22 22 20.6569 22 19C22 17.3431 20.6569 16 19 16C17.3431 16 16 17.3431 16 19C16 20.6569 17.3431 22 19 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M5.13 9C5.58 10.75 7.18 12.05 9.07 12.04L12.5 12.03C15.12 12.02 17.35 13.7 18.17 16.04\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"deleteArtist":{"viewBox":"0 0 24 24","body":"<path d=\"M18.41 18.09L15.59 20.91\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M18.41 20.91L15.59 18.09\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 21.8101C10.18 21.8101 8.37005 21.3501 6.99005 20.4301C4.57005 18.8101 4.57005 16.1701 6.99005 14.5601C9.74005 12.7201 14.25 12.7201 17 14.5601\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"removeArtists":{"viewBox":"0 0 24 24","body":"<path d=\"M19.5 19H15.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12.15 10.87C12.05 10.86 11.93 10.86 11.82 10.87C9.44005 10.79 7.55005 8.84 7.55005 6.44C7.55005 3.99 9.53005 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.42 8.84 14.53 10.79 12.15 10.87Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M11.99 21.8101C10.17 21.8101 8.36004 21.3501 6.98004 20.4301C4.56004 18.8101 4.56004 16.1701 6.98004 14.5601C9.73004 12.7201 14.24 12.7201 16.99 14.5601\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"filter":{"viewBox":"0 0 24 24","body":"<path d=\"M5.40002 2.09998H18.6C19.7 2.09998 20.6 2.99998 20.6 4.09998V6.29998C20.6 7.09998 20.1 8.09998 19.6 8.59998L15.3 12.4C14.7 12.9 14.3 13.9 14.3 14.7V19C14.3 19.6 13.9 20.4 13.4 20.7L12 21.6C10.7 22.4 8.90002 21.5 8.90002 19.9V14.6C8.90002 13.9 8.50002 13 8.10002 12.5L4.30002 8.49998C3.80002 7.99998 3.40002 7.09998 3.40002 6.49998V4.19998C3.40002 2.99998 4.30002 2.09998 5.40002 2.09998Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M10.93 2.09998L6 9.99998\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"filterSearch":{"viewBox":"0 0 24 24","body":"<path d=\"M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M16.07 16.52C17.8373 16.52 19.27 15.0873 19.27 13.32C19.27 11.5527 17.8373 10.12 16.07 10.12C14.3027 10.12 12.87 11.5527 12.87 13.32C12.87 15.0873 14.3027 16.52 16.07 16.52Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M19.87 17.12L18.87 16.12\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"folderAdd":{"viewBox":"0 0 24 24","body":"<path d=\"M12.0601 16.5V11.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M14.5 14H9.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\"/>"},"folderRemove":{"viewBox":"0 0 24 24","body":"<path d=\"M13.81 15.7299L10.27 12.1899\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M13.77 12.23L10.23 15.77\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\"/>"},"folderIgnore":{"viewBox":"0 0 24 24","body":"<path d=\"M14.4299 14.55H9.42993\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\"/>"},"history":{"viewBox":"0 0 24 24","body":"<path d=\"M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"mostPlayed":{"viewBox":"0 0 24 24","body":"<path d=\"M2 22H22\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M9.75 4V22H14.25V4C14.25 2.9 13.8 2 12.45 2H11.55C10.2 2 9.75 2.9 9.75 4Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3 10V22H7V10C7 8.9 6.6 8 5.4 8H4.6C3.4 8 3 8.9 3 10Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M17 15V22H21V15C21 13.9 20.6 13 19.4 13H18.6C17.4 13 17 13.9 17 15Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"hoursListened":{"viewBox":"0 0 24 24","body":"<path d=\"M16.5 9.5L12.3 13.7L10.7 11.3L7.5 14.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M14.5 9.5H16.5V11.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"nowPlaying":{"viewBox":"0 0 24 24","body":"<path d=\"M5.48009 18.4901V15.5701C5.48009 14.6001 6.24009 13.73 7.32009 13.73C8.29009 13.73 9.16008 14.4901 9.16008 15.5701V18.3801C9.16008 20.3301 7.54007 21.9501 5.59007 21.9501C3.64007 21.9501 2.02007 20.3201 2.02007 18.3801V12.22C1.91007 6.60003 6.35008 2.05005 11.9701 2.05005C17.5901 2.05005 22.0201 6.60005 22.0201 12.11V18.2701C22.0201 20.2201 20.4001 21.8401 18.4501 21.8401C16.5001 21.8401 14.8801 20.2201 14.8801 18.2701V15.4601C14.8801 14.4901 15.6401 13.6201 16.7201 13.6201C17.6901 13.6201 18.5601 14.3801 18.5601 15.4601V18.4901\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M15.53 9.11999H14.72C14.5 9.11999 14.29 9.25 14.19 9.44L13.44 10.94C13.33 11.16 13.02 11.16 12.91 10.94L11.07 7.27002C10.96 7.06002 10.66 7.05001 10.55 7.26001L9.70996 8.80999C9.60996 8.99999 9.40997 9.11999 9.18997 9.11999H8.45996\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"notifications":{"viewBox":"0 0 24 24","body":"<path d=\"M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M14 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"soundMute":{"viewBox":"0 0 24 24","body":"<path d=\"M2 10.1595V14.1595C2 16.1595 3 17.1595 5 17.1595H6.43C6.8 17.1595 7.17 17.2695 7.49 17.4595L10.41 19.2895C12.93 20.8695 15 19.7195 15 16.7495V7.56946C15 4.58946 12.93 3.44946 10.41 5.02946L7.49 6.85946C7.17 7.04946 6.8 7.15946 6.43 7.15946H5C3 7.15946 2 8.15946 2 10.1595Z\" stroke=\"currentColor\" stroke-width=\"1.5\"/>\n<path d=\"M22 14.1194L18.04 10.1594\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M21.96 10.1995L18 14.1595\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"soundProfile":{"viewBox":"0 0 24 24","body":"<path d=\"M9 22H15C18 22 19 21 19 18V6C19 3 18 2 15 2H9C6 2 5 3 5 6V18C5 21 6 22 9 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 18C13.6569 18 15 16.6569 15 15C15 13.3431 13.6569 12 12 12C10.3431 12 9 13.3431 9 15C9 16.6569 10.3431 18 12 18Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 9C12.8284 9 13.5 8.32843 13.5 7.5C13.5 6.67157 12.8284 6 12 6C11.1716 6 10.5 6.67157 10.5 7.5C10.5 8.32843 11.1716 9 12 9Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"bluetooth":{"viewBox":"0 0 24 24","body":"<path d=\"M8.58997 15.56L15.21 9.49002C15.49 9.24002 15.48 8.84004 15.19 8.60004L13.13 6.88004C12.59 6.43004 12.16 6.64003 12.16 7.34003V16.67C12.16 17.37 12.6 17.57 13.13 17.13L15.19 15.41C15.48 15.17 15.49 14.77 15.21 14.52L8.58997 8.45005\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"aux":{"viewBox":"0 0 24 24","body":"<path d=\"M6.72 9.56H5.78C3.7 9.56 2 7.86003 2 5.78003C2 3.70003 3.7 2 5.78 2H7.67001C9.23001 2 10.5 3.28002 10.5 4.83002V7.39001V17.1C10.5 18.14 9.64999 18.99 8.60999 18.99C7.56999 18.99 6.72 18.14 6.72 17.1V9.56Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M5.78009 6.72003C5.26009 6.72003 4.84009 6.30009 4.84009 5.78009C4.84009 5.26009 5.26009 4.84009 5.78009 4.84009\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M17.28 9.56H18.22C20.3 9.56 22 7.86003 22 5.78003C22 3.70003 20.3 2 18.22 2H16.33C14.77 2 13.5 3.28002 13.5 4.83002V7.39001V17.1C13.5 18.14 14.35 18.99 15.39 18.99C16.43 18.99 17.28 18.14 17.28 17.1V9.56Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M18.22 6.72003C18.74 6.72003 19.16 6.30009 19.16 5.78009C19.16 5.26009 18.74 4.84009 18.22 4.84009\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M8.5 22V19\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M15.5 22V19\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"floatingPlayer":{"viewBox":"0 0 24 24","body":"<path d=\"M22 10V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H11\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M15.27 22.0001C16.0652 22.0001 16.71 21.3554 16.71 20.5601C16.71 19.7648 16.0652 19.1201 15.27 19.1201C14.4747 19.1201 13.83 19.7648 13.83 20.5601C13.83 21.3554 14.4747 22.0001 15.27 22.0001Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M22 19.6001V13.9601C22 12.7601 21.2499 12.5901 20.4799 12.8001L17.59 13.5901C17.07 13.7301 16.7 14.1501 16.7 14.7501V15.7601V16.4401V20.5701\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M20.56 21.0402C21.3553 21.0402 22 20.3954 22 19.6002C22 18.8049 21.3553 18.1602 20.56 18.1602C19.7647 18.1602 19.12 18.8049 19.12 19.6002C19.12 20.3954 19.7647 21.0402 20.56 21.0402Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M16.71 16.43L22 14.99\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"minimizeFloating":{"viewBox":"0 0 24 24","body":"<path d=\"M6 12H18\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"minimizePlayerUI":{"viewBox":"0 0 24 24","body":"<path d=\"M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"minimizeToPlayerUI":{"viewBox":"0 0 24 24","body":"<title/>\n\n<g id=\"Complete\">\n\n<g id=\"minimize\">\n\n<g>\n\n<path d=\"M8,3V6A2,2,0,0,1,6,8H3\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"/>\n\n<path d=\"M16,21V18a2,2,0,0,1,2-2h3\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"/>\n\n<path d=\"M8,21V18a2,2,0,0,0-2-2H3\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"/>\n\n<path d=\"M16,3V6a2,2,0,0,0,2,2h3\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"/>\n\n</g>\n\n</g>\n\n</g>"},"expandPlayerTitle":{"viewBox":"0 0 24 24","body":"<path d=\"M2 9V6.5C2 4.01 4.01 2 6.5 2H9\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M15 2H17.5C19.99 2 22 4.01 22 6.5V9\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M22 16V17.5C22 19.99 19.99 22 17.5 22H16\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M9 22H6.5C4.01 22 2 19.99 2 17.5V15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"alignLeft":{"viewBox":"0 0 24 24","body":"<path d=\"M3 4.5H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3 9.5H12.47\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3 14.5H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3 19.5H12.47\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"alignCenter":{"viewBox":"0 0 24 24","body":"<path d=\"M3 4.5H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M7.26001 9.5H16.74\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3 14.5H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M7.26001 19.5H16.74\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"alignRight":{"viewBox":"0 0 24 24","body":"<path d=\"M3 4.5H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M11.53 9.5H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3 14.5H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M11.53 19.5H21\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"accent":{"viewBox":"0 0 24 24","body":"<path d=\"M10.97 2H8.97C3.97 2 1.97 4 1.97 9V15C1.97 20 3.97 22 8.97 22H14.97C19.97 22 21.97 20 21.97 15V13\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M21.88 3.55998C20.65 6.62998 17.56 10.81 14.98 12.88L13.4 14.14C13.2 14.29 13 14.41 12.77 14.5C12.77 14.35 12.76 14.2 12.74 14.04C12.65 13.37 12.35 12.74 11.81 12.21C11.26 11.66 10.6 11.35 9.92 11.26C9.76 11.25 9.6 11.24 9.44 11.25C9.53 11 9.66 10.77 9.83 10.58L11.09 8.99998C13.16 6.41998 17.35 3.30998 20.41 2.07998C20.88 1.89998 21.34 2.03998 21.63 2.32998C21.93 2.62998 22.07 3.08998 21.88 3.55998Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M12.78 14.49C12.78 15.37 12.44 16.21 11.81 16.85C11.32 17.34 10.66 17.68 9.87 17.78L7.9 17.99C6.83 18.11 5.91 17.2 6.03 16.11L6.24 14.14C6.43 12.39 7.89 11.27 9.45 11.24C9.61 11.23 9.77 11.24 9.93 11.25C10.61 11.34 11.27 11.65 11.82 12.2C12.36 12.74 12.66 13.36 12.75 14.03C12.77 14.19 12.78 14.35 12.78 14.49Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M15.82 11.9799C15.82 9.88994 14.13 8.18994 12.03 8.18994\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"palette":{"viewBox":"0 0 24 24","body":"<path d=\"M14 16C14 17.77 13.23 19.37 12 20.46C10.94 21.42 9.54 22 8 22C4.69 22 2 19.31 2 16C2 13.24 3.88 10.9 6.42 10.21C7.11 11.95 8.59 13.29 10.42 13.79C10.92 13.93 11.45 14 12 14C12.55 14 13.08 13.93 13.58 13.79C13.85 14.47 14 15.22 14 16Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M18 8C18 8.78 17.85 9.53 17.58 10.21C16.89 11.95 15.41 13.29 13.58 13.79C13.08 13.93 12.55 14 12 14C11.45 14 10.92 13.93 10.42 13.79C8.59 13.29 7.11 11.95 6.42 10.21C6.15 9.53 6 8.78 6 8C6 4.69 8.69 2 12 2C15.31 2 18 4.69 18 8Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M22 16C22 19.31 19.31 22 16 22C14.46 22 13.06 21.42 12 20.46C13.23 19.37 14 17.77 14 16C14 15.22 13.85 14.47 13.58 13.79C15.41 13.29 16.89 11.95 17.58 10.21C20.12 10.9 22 13.24 22 16Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"},"close":{"viewBox":"M6 6l12 12M18 6 6 18","body":{"stroke":"currentColor","stroke-width":"1.9","stroke-linecap":"round"}}};

function appIcon(name, extraClass = '', id = '') {
  const aliases = { library: 'tracks', 'audio-effects': 'equalizer', magic: 'mostPlayed', database: 'folders', info: 'warning' };
  name = aliases[name] || name;
  const icon = EMBEDDED_ICONS[name];
  if (!icon) return '';
  const classes = `app-icon${extraClass ? ` ${extraClass}` : ''}`;
  const idAttr = id ? ` id="${Utils.escapeHtml(id)}"` : '';
  return `<svg${idAttr} class="${classes}" data-icon="${Utils.escapeHtml(name)}" viewBox="${icon.viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" aria-hidden="true">${icon.body}</svg>`;
}

function hydrateStaticIcons(root = document) {
  root.querySelectorAll('[data-icon].app-icon').forEach(node => {
    if (node.tagName.toLowerCase() === 'img') return;
    const name = node.dataset.icon;
    const extra = [...node.classList].filter(c => c !== 'app-icon').join(' ');
    node.outerHTML = appIcon(name, extra, node.id);
  });
}

const UI = {
  currentPage: 'home',
  currentPageParams: {},
  isSelectionMode: false,
  selectedTracks: new Set(),
  currentTrackParams: {},
  lastLyricIndex: -1,
  trackMenuTargetId: null,
  trackMenuActions: null,
  currentSortBy: 'title',
  currentSortDir: 'asc',
  particleAnimationId: null,
  particleResizeHandler: null,
  _waveformCache: new Map(),
  _waveformToken: 0,

  getArtworkUrl(track) {
    if (!track) return 'assets/default-art.png';
    if (track.artworkBlob) {
      return URL.createObjectURL(track.artworkBlob);
    }
    return track.artwork || 'assets/default-art.png';
  },

  async init() {
    // Keep UI boot resilient: a missing/changed DOM element in one binder
    // must not prevent the remaining parts of the app from initializing.
    const safeBind = (name, fn) => {
      try {
        fn.call(this);
      } catch (e) {
        console.error(`UI initialization failed in ${name}:`, e);
      }
    };

    safeBind('bindGlobalEvents', this.bindGlobalEvents);
    safeBind('bindPlayerControls', this.bindPlayerControls);
    safeBind('bindFullPlayer', this.bindFullPlayer);
    safeBind('bindSidebar', this.bindSidebar);
    safeBind('bindTabBar', this.bindTabBar);
    safeBind('bindPlaylistModal', this.bindPlaylistModal);
    safeBind('bindParticles', this.bindParticles);
    safeBind('bindKeyboard', this.bindKeyboard);
    safeBind('bindTouchGestures', this.bindTouchGestures);
    safeBind('hydrateStaticIcons', () => hydrateStaticIcons());

    try {
      this.applyThemeMode();
    } catch (e) {
      console.error('UI initialization failed in applyThemeMode:', e);
    }

    window.addEventListener('track-changed', (e) => this.onTrackChanged(e.detail));
    window.addEventListener('playback-state', (e) => this.onPlaybackState(e.detail));
    window.addEventListener('time-update', (e) => this.onTimeUpdate(e.detail));
    window.addEventListener('audio-peak', (e) => this.onAudioPeak(e.detail));
    window.addEventListener('theme-colors', (e) => this.onThemeColors(e.detail));
    window.addEventListener('setting-changed', (e) => this.onSettingChanged(e.detail));
    window.addEventListener('scan-progress', (e) => this.onScanProgress(e.detail));
    window.addEventListener('scan-complete', (e) => this.onScanComplete(e.detail));

    if (Player.currentTrack) {
      this.onTrackChanged(Player.currentTrack);
    }
    this.updatePlayerControls();
    this.renderSidebarPlaylists();
    this.navigate('home');
  },

  bindGlobalEvents() {
    document.getElementById('menu-toggle').addEventListener('click', () => this.toggleSidebar());
    document.getElementById('close-sidebar').addEventListener('click', () => this.toggleSidebar());
    document.getElementById('sidebar-overlay').addEventListener('click', () => this.toggleSidebar());
    document.getElementById('search-toggle').addEventListener('click', () => this.toggleGlobalSearch());
    document.getElementById('close-playlist-modal').addEventListener('click', () => this.hidePlaylistModal());
    document.getElementById('create-playlist-btn').addEventListener('click', () => this.createPlaylist());
    document.getElementById('close-track-menu').addEventListener('click', () => this.hideTrackMenu());
    document.getElementById('close-player-options').addEventListener('click', () => this.hidePlayerOptions());
    document.querySelectorAll('[data-close-overlay]').forEach(el => el.addEventListener('click', () => this.closePlayerOverlay(el.dataset.closeOverlay)));
    document.getElementById('fp-options')?.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.showPlayerOptions(); });
    document.getElementById('fp-lyrics-btn')?.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.openLyricsOverlay(false); });
    document.getElementById('fp-audio-effects')?.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.openAudioEffectsOverlay(); });
    this.bindLyricsLongPress();
    document.getElementById('player-options-modal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('player-options-modal')) this.hidePlayerOptions();
    });

    document.getElementById('playlist-modal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('playlist-modal')) this.hidePlaylistModal();
    });
    document.getElementById('track-menu-modal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('track-menu-modal')) this.hideTrackMenu();
    });
  },

  bindPlayerControls() {
    const npPlay = document.getElementById('np-play');
    const npPrev = document.getElementById('np-prev');
    const npNext = document.getElementById('np-next');
    const npTrack = document.getElementById('np-track');

    npPlay?.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); Player.togglePlay(); });
    npPrev?.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); Player.prev(); });
    npNext?.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); Player.next(); });

    if (npTrack) {
      let holdTimer = null;
      let held = false;
      let pointerActive = false;
      const clearHold = () => { if (holdTimer) clearTimeout(holdTimer); holdTimer = null; };
      npTrack.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        pointerActive = true;
        held = false;
        clearHold();
        holdTimer = setTimeout(() => {
          if (!pointerActive || !Player.currentTrack || !SettingsManager.get('ui.floatingMiniPlayer', true)) return;
          held = true;
          if (navigator.vibrate) navigator.vibrate(18);
          this.openFloatingMiniPlayer();
        }, 1000);
      });
      npTrack.addEventListener('pointerup', (e) => {
        e.preventDefault();
        e.stopPropagation();
        pointerActive = false;
        clearHold();
        if (!held) this.openFullPlayer();
        held = false;
      });
      npTrack.addEventListener('pointercancel', (e) => { e.preventDefault(); e.stopPropagation(); pointerActive = false; clearHold(); held = false; });
      npTrack.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); });
    }

    this.ensureFloatingMiniPlayer();
    const current = document.getElementById('fp-current');
    const duration = document.getElementById('fp-duration');
    current?.addEventListener('click', (e) => { e.stopPropagation(); Player.seekSeconds(-Number(SettingsManager.get('playback.timeSkipInterval', 10))); });
    duration?.addEventListener('click', (e) => { e.stopPropagation(); Player.seekSeconds(Number(SettingsManager.get('playback.timeSkipInterval', 10))); });
  },

  ensureFloatingMiniPlayer() {
    if (document.getElementById('floating-mini-player')) return;
    const el = document.createElement('div');
    el.id = 'floating-mini-player';
    el.className = 'floating-mini-player';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `
      <div class="floating-mini-backdrop" data-floating-close></div>
      <div class="floating-mini-stack" role="dialog" aria-label="Floating album artwork">
        <section class="floating-mini-card">
          <img id="floating-mini-art" class="floating-mini-art" src="assets/default-art.png" alt="">
          <button id="floating-mini-favorite" class="floating-mini-favorite" type="button" aria-label="Add to favourites">${appIcon('favourite')}</button>
        </section>
        <div class="floating-mini-caption">
          <div id="floating-mini-title" class="floating-mini-title">Not Playing</div>
          <div id="floating-mini-artist" class="floating-mini-artist">-</div>
        </div>
      </div>`;
    document.body.appendChild(el);
    el.querySelector('[data-floating-close]')?.addEventListener('click', () => this.closeFloatingMiniPlayer());
    el.querySelector('#floating-mini-favorite')?.addEventListener('click', (e) => { e.stopPropagation(); this.toggleFavorite(); this.updateFloatingMiniPlayer(); });
    el.querySelector('.floating-mini-card')?.addEventListener('click', (e) => {
      if (e.target.closest('#floating-mini-favorite')) return;
      this.closeFloatingMiniPlayer();
    });
  },

  openFloatingMiniPlayer() {
    if (!SettingsManager.get('ui.floatingMiniPlayer', true) || !Player.currentTrack) return;
    this.ensureFloatingMiniPlayer();
    const el = document.getElementById('floating-mini-player');
    if (!el) return;
    const blur = Math.max(0, Math.min(60, Number(SettingsManager.get('ui.floatingPlayerBlur', 24)) || 24));
    el.style.setProperty('--floating-blur', `${blur}px`);
    el.classList.add('open');
    el.setAttribute('aria-hidden', 'false');
    this.updateFloatingMiniPlayer();
  },

  closeFloatingMiniPlayer() {
    const el = document.getElementById('floating-mini-player');
    if (!el) return;
    el.classList.remove('open');
    el.setAttribute('aria-hidden', 'true');
  },

  updateFloatingMiniPlayer() {
    const track = Player.currentTrack;
    if (!track) return;
    this.ensureFloatingMiniPlayer();
    const art = this.getArtworkUrl(track);
    const img = document.getElementById('floating-mini-art');
    if (img) img.src = art;
    const title = document.getElementById('floating-mini-title');
    const artist = document.getElementById('floating-mini-artist');
    if (title) title.textContent = track.title || 'Unknown';
    if (artist) artist.textContent = track.artist || '-';
    document.getElementById('floating-mini-favorite')?.classList.toggle('active', !!track.favorite);
    const play = document.getElementById('floating-mini-play');
    if (play) play.innerHTML = appIcon(Player.isPlaying ? 'pause-for-mini-player' : 'play-for-mini-player');
  },

  bindFullPlayer() {
    const fp = document.getElementById('full-player');
    const fpClose = document.getElementById('fp-close');
    const fpPlay = document.getElementById('fp-play');
    const fpPrev = document.getElementById('fp-prev');
    const fpNext = document.getElementById('fp-next');
    const fpShuffle = document.getElementById('fp-shuffle');
    const fpRepeat = document.getElementById('fp-repeat');
    const fpFavorite = document.getElementById('fp-favorite');
    const fpProgress = document.getElementById('fp-progress-container');
    const fpOptions = document.getElementById('fp-options');

    fpClose.addEventListener('click', () => this.closeFullPlayer());
    fpPlay.addEventListener('click', () => Player.togglePlay());
    fpPrev.addEventListener('click', () => Player.prev());
    fpNext.addEventListener('click', () => Player.next());
    fpShuffle.addEventListener('click', () => this.toggleShuffle());
    fpRepeat.addEventListener('click', () => this.handleRepeatButton());
    fpFavorite.addEventListener('click', () => this.toggleFavorite());
    fpOptions.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); this.showPlayerOptions(); });

    // Album-art gestures: tap -> album, hold -> artist, swipe left/right -> next/previous.
    // Keep this interaction on the artwork layer only so player controls/options remain untouched.
    const fpArtSurface = document.getElementById('fp-art-container');
    if (fpArtSurface) {
      let gestureStartX = 0;
      let gestureStartY = 0;
      let gestureStartTime = 0;
      let gestureTimer = null;
      let gestureLongPressed = false;
      let gestureMoved = false;

      const clearGestureTimer = () => {
        if (gestureTimer) {
          clearTimeout(gestureTimer);
          gestureTimer = null;
        }
      };

      fpArtSurface.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        gestureStartX = e.clientX;
        gestureStartY = e.clientY;
        gestureStartTime = Date.now();
        gestureLongPressed = false;
        gestureMoved = false;
        clearGestureTimer();
        gestureTimer = setTimeout(() => {
          if (!gestureMoved && Player.currentTrack) {
            gestureLongPressed = true;
            if (navigator.vibrate) navigator.vibrate(18);
            const artist = Player.currentTrack.artist || '';
            this.closeFullPlayer();
            if (artist) this.navigate('artist-detail', { artist });
          }
        }, 650);
        try { fpArtSurface.setPointerCapture(e.pointerId); } catch (_) {}
      });

      fpArtSurface.addEventListener('pointermove', (e) => {
        const dx = e.clientX - gestureStartX;
        const dy = e.clientY - gestureStartY;
        if (Math.abs(dx) > 12 || Math.abs(dy) > 12) {
          gestureMoved = true;
          clearGestureTimer();
        }
      });

      fpArtSurface.addEventListener('pointerup', (e) => {
        clearGestureTimer();
        const dx = e.clientX - gestureStartX;
        const dy = e.clientY - gestureStartY;
        const elapsed = Date.now() - gestureStartTime;
        const horizontalSwipe = Math.abs(dx) >= 70 && Math.abs(dx) > Math.abs(dy) * 1.25;

        if (gestureLongPressed) {
          e.preventDefault();
          return;
        }

        if (horizontalSwipe && Player.currentTrack) {
          e.preventDefault();
          if (navigator.vibrate) navigator.vibrate(10);
          if (dx < 0) {
            Player.next();
          } else {
            Player.prev();
          }
          return;
        }

        if (!gestureMoved && elapsed < 650 && Player.currentTrack) {
          e.preventDefault();
          if (navigator.vibrate) navigator.vibrate(8);
          const trackId = Player.currentTrack.id;
          this.closeFullPlayer();
          this.goToAlbum(trackId);
        }
      });

      fpArtSurface.addEventListener('pointercancel', clearGestureTimer);
      fpArtSurface.addEventListener('lostpointercapture', clearGestureTimer);
      fpArtSurface.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    let isDragging = false;
    fpProgress.addEventListener('click', (e) => {
      const rect = fpProgress.getBoundingClientRect();
      const percent = ((e.clientX - rect.left) / rect.width) * 100;
      Player.seek(percent);
    });

    const handleDrag = (e) => {
      if (!isDragging) return;
      const rect = fpProgress.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      Player.seek(percent);
    };

    fpProgress.addEventListener('mousedown', () => isDragging = true);
    fpProgress.addEventListener('touchstart', () => isDragging = true);
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('touchend', () => isDragging = false);

    let touchStartY = 0;
    let touchStartX = 0;
    fp.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    });
    fp.addEventListener('touchmove', (e) => {
      const diffY = e.touches[0].clientY - touchStartY;
      const diffX = e.touches[0].clientX - touchStartX;
      if (diffY > 80 && Math.abs(diffX) < 50) {
        this.closeFullPlayer();
      }
    });
  },

  bindSidebar() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        if (page === 'search') {
          this.toggleSidebar();
          this.openGlobalSearch();
          return;
        }
        this.navigate(page);
        this.toggleSidebar();
      });
    });
  },

  bindTabBar() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        this.navigate(tab);
      });
    });
  },

  bindPlaylistModal() {
    document.getElementById('playlist-modal').addEventListener('click', (e) => {
      if (e.target.id === 'playlist-modal') this.hidePlaylistModal();
    });
  },

  bindParticles() {
    this.startParticles();
  },

  startParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    if (this.particleAnimationId) return;
    if (!SettingsManager.get('ui.particlesEnabled')) {
      this.stopParticles();
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    if (!this.particleResizeHandler) {
      this.particleResizeHandler = resize;
      window.addEventListener('resize', resize);
    }

    const particles = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      if (!SettingsManager.get('ui.particlesEnabled')) {
        this.particleAnimationId = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const intensity = SettingsManager.get('ui.particlesIntensity') || 0.6;
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#d4af37';

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.008;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulseOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse)) * intensity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = pulseOpacity;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = pulseOpacity * 0.15;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      this.particleAnimationId = requestAnimationFrame(animate);
    };

    this.particleAnimationId = requestAnimationFrame(animate);
  },

  stopParticles() {
    if (this.particleAnimationId) {
      cancelAnimationFrame(this.particleAnimationId);
      this.particleAnimationId = null;
    }
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  },
  bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      switch(e.code) {
        case 'Space': e.preventDefault(); Player.togglePlay(); break;
        case 'ArrowRight': Player.next(); break;
        case 'ArrowLeft': Player.prev(); break;
        case 'ArrowUp': Player.setVolume(Math.min(1, Player.audio.volume + 0.1)); break;
        case 'ArrowDown': Player.setVolume(Math.max(0, Player.audio.volume - 0.1)); break;
        case 'KeyF': if (Player.currentTrack) this.toggleFavorite(); break;
        case 'KeyS': this.toggleShuffle(); break;
        case 'KeyR': this.toggleRepeat(); break;
        case 'KeyM': this.toggleSidebar(); break;
      }
    });
  },

  bindTouchGestures() {
    let startX = 0;
    let startY = 0;
    const app = document.getElementById('app');

    app.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    app.addEventListener('touchmove', (e) => {
      const diffX = e.touches[0].clientX - startX;
      const diffY = e.touches[0].clientY - startY;

      if (Math.abs(diffX) > 80 && Math.abs(diffY) < 50) {
        if (diffX > 0 && startX < 30) {
          this.toggleSidebar();
        }
      }
    });
  },

  updatePlayerControls() {
    const isPlaying = Player.isPlaying;
    const npEl = document.getElementById('np-play-icon');
    const fpEl = document.getElementById('fp-play-icon');
    if (npEl) npEl.outerHTML = appIcon(isPlaying ? 'pauseMini' : 'playMini', 'app-icon', 'np-play-icon');
    if (fpEl) fpEl.outerHTML = appIcon(isPlaying ? 'pause' : 'play', 'app-icon', 'fp-play-icon');

    const shuffleButton = document.getElementById('fp-shuffle');
    const repeatButton = document.getElementById('fp-repeat');
    if (shuffleButton) shuffleButton.classList.toggle('active', SettingsManager.get('playback.shuffleMode'));
    this.updateRepeatControl();
  },

  updateRepeatControl() {
    const button = document.getElementById('fp-repeat');
    const icon = document.getElementById('fp-repeat-icon');
    const count = document.getElementById('fp-repeat-count');
    if (!button || !icon) return;

    const mode = SettingsManager.get('playback.repeatMode', 'none');
    const countValue = Math.max(1, Number(SettingsManager.get('playback.repeatNTimes', 1)) || 1);
    const iconMap = {
      none: 'none',        // Repeat off: repeat arrows + dash
      all: 'repeatAll',   // Repeat all: same repeat arrows, no dash
      one: 'repeatOne',
      n: 'repeatN'
    };
    const labels = {
      none: 'Repeat off',
      all: 'Repeat all',
      one: 'Repeat one',
      n: `Repeat track ${countValue} times`
    };

    icon.dataset.icon = mode;
    icon.outerHTML = appIcon(iconMap[mode] || iconMap.none, 'app-icon', 'fp-repeat-icon');
    button.classList.toggle('active', mode !== 'none');
    button.dataset.repeatMode = mode;
    button.setAttribute('aria-label', labels[mode] || labels.none);
    button.title = labels[mode] || labels.none;

    if (count) {
      count.textContent = mode === 'n' ? `×${countValue}` : '';
      count.hidden = mode !== 'n';
    }
  },

  onTrackChanged(track) {
    const artwork = this.getArtworkUrl(track);
    document.getElementById('now-playing-bar').classList.remove('hidden');
    document.getElementById('np-title').textContent = track.title || 'Unknown';
    document.getElementById('np-artist').textContent = track.artist || '-';
    document.getElementById('np-art').src = artwork;
    document.getElementById('fp-title').textContent = track.title || 'Unknown';
    document.getElementById('fp-artist').textContent = track.artist || '-';
    document.getElementById('fp-art').src = artwork;
    this.applyFillArtworkForeground(artwork);
    const reflectionArt = document.getElementById('fp-reflection-art');
    if (reflectionArt) reflectionArt.src = artwork;
    const fpSheet = document.querySelector('#full-player .fp-sheet');
    if (fpSheet && artwork) fpSheet.style.setProperty('--fp-art-url', `url(\"${String(artwork).replace(/\"/g, '%22')}\")`);
    document.getElementById('fp-favorite').classList.toggle('active', track.favorite);
    document.getElementById('sidebar-title').textContent = track.title || 'Not Playing';
    document.getElementById('sidebar-artist').textContent = track.artist || '-';
    document.getElementById('sidebar-art').src = artwork;
    this.updatePlayerControls();
    this._prepareTrackWaveform(track);
    if (this.currentPage === 'tracks' || this.currentPage === 'favorites' ||
        this.currentPage === 'album-detail' || this.currentPage === 'artist-detail' ||
        this.currentPage === 'genre-detail' || this.currentPage === 'playlist-detail') {
      this.updateVisibleTrackRows(track?.id);
    } else if (this.currentPage === 'queue') {
      this.renderCurrentPage();
    }
    this.applyWaveformMode();
    this.updateFloatingMiniPlayer();
  },

  onPlaybackState(detail) {
    this.updatePlayerControls();
    document.getElementById('fp-art').classList.remove('playing');
    this.updateFloatingMiniPlayer();
  },

  onTimeUpdate(detail) {
    const progress = detail.progress || 0;
    document.getElementById('np-progress').style.width = progress + '%';
    document.getElementById('fp-progress-bar').style.width = progress + '%';
    document.getElementById('fp-progress-handle').style.left = progress + '%';
    document.getElementById('fp-current').textContent = Utils.formatTime(detail.current);
    document.getElementById('fp-duration').textContent = Utils.formatTime(detail.duration);
    if (SettingsManager.get('ui.waveformSeekbar')) this.renderWaveform();
  },

  onAudioPeak(detail) {
    const peak = detail.smooth || 0;
    const npBar = document.getElementById('now-playing-bar');
    if (!npBar) return;

    if (!SettingsManager.get('ui.miniplayerGlow')) {
      npBar.style.boxShadow = '';
      return;
    }

    const intensity = peak * 15;
    const mode = SettingsManager.get('ui.miniplayerGlowMode');
    if (mode === 'dynamic') {
      npBar.style.boxShadow = `0 4px 24px rgba(0,0,0,0.4), 0 0 ${intensity}px rgba(var(--accent-rgb), ${peak * 0.3})`;
    } else {
      npBar.style.boxShadow = `0 4px 24px rgba(0,0,0,0.4), 0 0 ${intensity}px rgba(255,255,255, ${peak * 0.15})`;
    }
  },

  safeAccentColor(primary, fallback, palette = []) {
    const parse = (value) => {
      if (!value) return null;
      const raw = String(value).trim();
      const m = raw.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
      if (m) return [Number(m[1]), Number(m[2]), Number(m[3])];
      const h = raw.replace('#', '');
      if (/^[0-9a-f]{6}$/i.test(h)) return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
      return null;
    };
    const lum = ([r,g,b]) => {
      const f = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      return 0.2126*f(r) + 0.7152*f(g) + 0.0722*f(b);
    };
    const sat = ([r,g,b]) => {
      const mx=Math.max(r,g,b), mn=Math.min(r,g,b);
      return mx === mn ? 0 : (mx-mn)/Math.max(1,mx);
    };
    const ratio = (a,b) => {
      const x=lum(a), y=lum(b), hi=Math.max(x,y), lo=Math.min(x,y);
      return (hi+0.05)/(lo+0.05);
    };
    const distance = (a,b) => Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2);
    const isLightTheme = document.body.classList.contains('light');
    const base = isLightTheme ? [255,255,255] : [0,0,0];
    const primaryRgb = parse(primary);
    const colors = [...palette, primary, fallback].map(parse).filter(Boolean);
    if (!colors.length) return null;

    // Only use colours that actually came from the artwork palette. The previous
    // version manufactured a new hue when nothing passed its tests, which made
    // the accent look disconnected from the cover.
    const unique = [];
    for (const c of colors) {
      if (!unique.some(u => distance(u,c) < 18)) unique.push(c);
    }

    let best = null, bestScore = -Infinity;
    for (const c of unique) {
      const l = lum(c);
      const s = sat(c);
      const cr = ratio(c, base);
      if (l <= 0.035 || l >= 0.965) continue;
      if (cr < 3.0) continue;
      // Prefer a real artwork colour with moderate chroma. Extremely saturated
      // neon colours are intentionally penalized, not generated or boosted.
      const chromaPenalty = Math.max(0, s - 0.62) * 3.5;
      const mutedPenalty = Math.max(0.10 - s, 0) * 2.0;
      const primaryCloseness = primaryRgb ? Math.max(0, 1 - distance(c, primaryRgb) / 442) : 0;
      const score = cr * 2.5 + primaryCloseness * 1.8 + Math.min(s, 0.62) - chromaPenalty - mutedPenalty;
      if (score > bestScore) { best = c; bestScore = score; }
    }

    // If the palette is mostly extreme colours, choose the closest actual
    // artwork colour that still contrasts enough with the theme surface.
    if (!best) {
      best = unique
        .filter(c => lum(c) > 0.035 && lum(c) < 0.965)
        .sort((a,b) => ratio(b, base) - ratio(a, base))[0] || unique[0];
    }

    return {
      css: `rgb(${best.join(', ')})`,
      rgb: best,
      baseCss: isLightTheme ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
      baseRgb: base
    };
  },
  onThemeColors(detail) {
    const root = document.documentElement;
    const palette = Array.isArray(detail?.palette) ? detail.palette : [];
    const accent = this.safeAccentColor(detail?.dominant, detail?.vibrant, palette);
    if (!accent) return;
    root.style.setProperty('--dynamic-primary', accent.css);
    root.style.setProperty('--dynamic-vibrant', accent.css);
    root.style.setProperty('--accent-rgb', accent.rgb.join(', '));
    root.style.setProperty('--fp-art-accent', accent.css);
    root.style.setProperty('--fp-art-accent-rgb', accent.rgb.join(', '));
    const playerBase = document.body.classList.contains('light') ? [255, 255, 255] : [0, 0, 0];
    root.style.setProperty('--fp-bottom-color', `rgb(${playerBase.join(', ')})`);
    root.style.setProperty('--fp-bottom-color-rgb', playerBase.join(', '));

    const baseLum = (() => {
      const [r,g,b] = accent.baseRgb;
      const f=v=>{v/=255; return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4)};
      return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);
    })();
    const foreground = baseLum >= 0.52 ? [12,12,12] : [248,248,248];
    const muted = baseLum >= 0.52 ? [48,48,48] : [218,218,218];
    const css = c => `rgb(${c.join(', ')})`;
    root.style.setProperty('--fp-foreground', css(foreground));
    root.style.setProperty('--fp-muted', css(muted));
    root.style.setProperty('--fp-icon-color', css(foreground));
    if (SettingsManager.get('ui.waveformSeekbar')) requestAnimationFrame(() => this.renderWaveform());
  },

  async applyFillArtworkForeground(artworkSrc = null, palette = []) {
    const src = artworkSrc || document.getElementById('fp-art')?.currentSrc || document.getElementById('fp-art')?.src;
    let colors = Array.isArray(palette) ? palette : [];
    if ((!colors.length || colors.length < 2) && src && src !== 'assets/default-art.png') {
      try {
        const extracted = await Utils.extractColors(src);
        if (extracted) colors = extracted.palette || [];
        if (extracted) this.onThemeColors(extracted);
      } catch (e) {}
    }
    if (!colors.length) return;
    const detail = { palette: colors, dominant: colors[0], vibrant: colors[1] || colors[0] };
    this.onThemeColors(detail);
  },

  async onSettingChanged(detail) {
    const { path, value } = detail;

    try {
      switch (path) {
        case 'audio.equalizerEnabled':
          Player.updateEqualizerEnabled();
          break;
        case 'audio.eqCurrentPreset':
        case 'audio.eqCustomValues':
          Player.applyEQPreset();
          break;
        case 'audio.pitchSemitones':
        case 'audio.playbackSpeed':
        case 'audio.volumeBoost':
        case 'audio.volumeBoostEnabled':
          Player.applyPlaybackEffects();
          if (this.currentPage === 'audio-effects') this.renderCurrentPage();
          if (document.getElementById('audio-effects-overlay')?.classList.contains('open')) this.openAudioEffectsOverlay();
          break;
        case 'audio.skipSilence':
        case 'audio.skipSilenceThreshold':
          Player.updateSkipSilence();
          break;
        case 'audio.gaplessPlayback':
          Player.updateGaplessPlayback();
          break;
        case 'audio.crossfadeDuration':
          if (Number(value) === 0) Player.cancelCrossfade?.();
          break;
        case 'playback.persistentQueue':
          Player.updatePersistentQueue();
          break;
        case 'playback.smartPause.onCall':
        case 'playback.smartPause.onNotification':
        case 'playback.smartPause.onVolumeZero':
        case 'playback.smartPause.onAppSwitch':
        case 'playback.smartPause.onHeadphoneDisconnect':
          Player.updateSmartPause();
          break;
        case 'playback.shuffleMode':
        case 'playback.repeatMode':
        case 'playback.repeatNTimes':
          this.updatePlayerControls();
          break;
        case 'ui.themeMode':
          this.applyThemeMode();
          break;
        case 'ui.dynamicTheming':
          await this.applyDynamicTheme();
          break;
        case 'ui.particlesEnabled':
          if (value) this.startParticles();
          else this.stopParticles();
          break;
        case 'ui.particlesIntensity':
          // The animation reads this value every frame.
          break;
        case 'ui.miniplayerGlow':
        case 'ui.miniplayerGlowMode':
          if (!value && path === 'ui.miniplayerGlow') {
            const bar = document.getElementById('now-playing-bar');
            if (bar) bar.style.boxShadow = '';
          }
          break;
        case 'ui.gridColumns':
        case 'ui.gridViewStyle':
          this.renderCurrentPage();
          break;
        case 'ui.waveformSeekbar':
          this.applyWaveformMode();
          break;
        case 'ui.fillAlbumArt':
          this.applyFillAlbumArtMode();
          break;
        case 'ui.waveformBars':
          this._waveformCache.clear();
          this.applyWaveformMode();
          break;
        case 'ui.vibrationMode':
        case 'ui.glassmorphism':
        case 'ui.glassIntensity':
          this.applyThemeMode();
          break;
        case 'library.extractFeaturedArtists':
        case 'library.moodTagsEnabled':
        case 'library.artistSeparators':
        case 'library.genreSeparators':
        case 'library.minFileSizeMB':
        case 'library.minDurationSeconds':
        case 'library.excludeFolders':
        case 'library.deduplicateBy':
        case 'library.allowMultipleAlbums':
          this.showToast('Saved. The next library scan will use this setting.');
          break;
        case 'library.autoIndexOnLaunch':
          this.showToast(value ? 'Auto Index enabled for supported folder access.' : 'Auto Index disabled.');
          break;
        case 'smart.lostMemoriesEnabled':
        case 'smart.mostPlayedAutoUpdate':
        case 'smart.mostPlayedMaxTracks':
        case 'smart.mostPlayedMinPlays':
          await Data.refreshAutoPlaylists();
          this.renderSidebarPlaylists();
          this.renderCurrentPage();
          break;
        case 'history.minListenSeconds':
        case 'history.minListenPercent':
        case 'history.scrobbleEnabled':
        case 'lyrics.enabled':
        case 'lyrics.fontSize':
        case 'lyrics.alignCenter':
        case 'lyrics.highlightCurrentLine':
          if (document.getElementById('lyrics-overlay')?.classList.contains('open')) this.openLyricsOverlay(document.getElementById('lyrics-overlay')?.classList.contains('expanded'));
          this.renderCurrentPage();
          break;
      }
    } catch (error) {
      console.error(`Failed to apply setting ${path}:`, error);
    }
  },

  applyThemeMode() {
    const mode = SettingsManager.get('ui.themeMode', 'dark');
    const isLight = mode === 'light';
    document.body.classList.toggle('light', isLight);
    document.body.classList.toggle('glass-enabled', SettingsManager.get('ui.glassmorphism', true));
    document.body.style.setProperty('--glass-intensity', String(SettingsManager.get('ui.glassIntensity', 0.28)));
    this.applyFillAlbumArtMode();
    document.body.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', isLight ? '#f5f5f5' : '#000000');

    const themeIcon = document.getElementById('theme-setting-icon');
    if (themeIcon) {
      themeIcon.outerHTML = appIcon(isLight ? 'lightMode' : 'darkMode', 'app-icon setting-icon', 'theme-setting-icon');
    }
  },

  async applyDynamicTheme() {
    if (!SettingsManager.get('ui.dynamicTheming')) {
      const root = document.documentElement;
      root.style.removeProperty('--dynamic-primary');
      root.style.removeProperty('--dynamic-vibrant');
      root.style.setProperty('--dynamic-primary', 'rgb(54, 104, 196)');
      root.style.setProperty('--dynamic-vibrant', 'rgb(54, 104, 196)');
      root.style.setProperty('--accent-rgb', '54, 104, 196');
      if (SettingsManager.get('ui.waveformSeekbar')) requestAnimationFrame(() => this.renderWaveform());
      return;
    }

    const track = Player.currentTrack;
    if (!track) return;

    let artwork = Player.currentArtworkUrl || null;
    if (!artwork) artwork = this.getArtworkUrl(track);
    if (!artwork || artwork === 'assets/default-art.png') return;

    try {
      const colors = await Utils.extractColors(artwork);
      this.onThemeColors(colors);
    } catch(e) {
      console.warn('Could not apply dynamic theme:', e);
    }
  },
  onScanProgress(detail) {
    console.log(`Scanning: ${detail.progress}% - ${detail.current}`);
  },

  onScanComplete(detail) {
    console.log(`Scan complete. Added ${detail.added} tracks.`);
    this.renderSidebarPlaylists();
    this.renderCurrentPage();
  },

  navigate(page, params = {}) {
    this.currentPage = page;
    this.currentPageParams = params;
    if (page === 'tracks' || page === 'favorites') {
      this.currentTrackParams = params;
    }
    this.renderCurrentPage();
    this.updateActiveNav();
    this.updatePageTitle();
    document.getElementById('page-container').scrollTop = 0;
    Utils.vibrate(8);
  },

  renderCurrentPage() {
    const container = document.getElementById('page-container');
    switch(this.currentPage) {
      case 'home': this.renderHome(container); break;
      case 'search': this.renderSearch(container); break;
      case 'tracks': this.renderTracks(container, this.currentPageParams); break;
      case 'albums': this.renderAlbums(container); break;
      case 'artists': this.renderArtists(container); break;
      case 'genres': this.renderGenres(container); break;
      case 'playlists': this.renderPlaylists(container); break;
      case 'playlist-detail': this.renderPlaylistDetail(container, this.currentPageParams); break;
      case 'queue': this.renderQueue(container); break;
      case 'lyrics': this.renderLyrics(container); break;
      case 'folders': this.renderFolders(container); break;
      case 'favorites': this.renderFavorites(container); break;
      case 'settings': this.renderSettings(container); break;
      case 'album-detail': this.renderAlbumDetail(container, this.currentPageParams); break;
      case 'artist-detail': this.renderArtistDetail(container, this.currentPageParams); break;
      case 'genre-detail': this.renderGenreDetail(container, this.currentPageParams); break;
      case 'audio-effects': this.renderAudioEffects(container); break;
      default: this.renderHome(container);
    }
  },

  updatePageTitle() {
    const titles = {
      home: 'Home', search: 'Search', tracks: 'Tracks', albums: 'Albums',
      artists: 'Artists', 'artist-detail': 'Artist', genres: 'Genres', playlists: 'Playlists',
      queue: 'Queue', lyrics: 'Lyrics', folders: 'Folders',
      favorites: 'Favorites', settings: 'Settings', 'audio-effects': 'Audio Effects'
    };
    document.getElementById('page-title').textContent = titles[this.currentPage] || 'Okvy MusiQ';
  },

  updateActiveNav() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === this.currentPage);
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === this.currentPage);
    });
  },

  async renderHome(container) {
    const tracks = await Data.getTracks();
    const albumRecords = await Data.getAll('albums');
    const artistRecords = await Data.getAll('artists');
    const playlists = await Data.getPlaylists();
    // Count unique logical albums/artists from the actual track library so stale/duplicate index records
    // can never produce incorrect Home statistics. Multiple albums are only distinct when their album
    // artist is distinct and the setting explicitly allows it.
    const normalizeKey = value => String(value || '').trim().replace(/\s+/g, ' ').toLowerCase();
    const uniqueAlbums = new Set();
    tracks.forEach(track => {
      const album = normalizeKey(track.album);
      if (!album) return;
      const albumArtist = normalizeKey(track.albumArtist || track.artist || 'Unknown Artist');
      const allowMultiple = SettingsManager.get('library.allowMultipleAlbums');
      uniqueAlbums.add(allowMultiple ? `${album}\u0000${albumArtist}` : album);
    });
    const uniqueArtists = new Set();
    tracks.forEach(track => {
      const names = [...Utils.splitArtists(track.artist || ''), ...(Array.isArray(track.featuredArtists) ? track.featuredArtists : [])];
      names.forEach(name => {
        const key = normalizeKey(name);
        if (key) uniqueArtists.add(key);
      });
    });
    const favorites = tracks.filter(t => t.favorite);
    const recent = [...tracks].sort((a,b) => (b.lastPlayed||0) - (a.lastPlayed||0)).slice(0, 10);
    const mostPlayed = [...tracks].sort((a,b) => (b.playCount||0) - (a.playCount||0)).slice(0, 10);

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    let html = `
      <div class="hero-section">
        <div class="hero-greeting">${greeting}</div>
        <div class="hero-sub">${tracks.length} songs in your library</div>
        <div class="hero-card">
          <div class="hero-stats">
            <div class="stat-item"><div class="stat-value">${tracks.length}</div><div class="stat-label">Songs</div></div>
            <div class="stat-item"><div class="stat-value">${uniqueAlbums.size}</div><div class="stat-label">Albums</div></div>
            <div class="stat-item"><div class="stat-value">${uniqueArtists.size}</div><div class="stat-label">Artists</div></div>
            <div class="stat-item"><div class="stat-value">${favorites.length}</div><div class="stat-label">Favorites</div></div>
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn-gold btn-large" onclick="UI.scanMusic()">Scan Music</button>
            <button class="btn-outline" onclick="UI.navigate('tracks')">View All</button>
          </div>
        </div>
      </div>
    `;

    if (recent.length > 0) {
      html += `<div class="section-header"><h2>Recently Played</h2></div><div class="h-scroll">`;
      recent.forEach(track => {
        html += `<div class="h-scroll-item" onclick="UI.playTrackById('${track.id}')">${this.renderAlbumCard(track, 'small')}</div>`;
      });
      html += `</div>`;
    }

    if (mostPlayed.length > 0) {
      html += `<div class="section-header"><h2>Most Played</h2></div><div class="h-scroll">`;
      mostPlayed.forEach(track => {
        html += `<div class="h-scroll-item" onclick="UI.playTrackById('${track.id}')">${this.renderAlbumCard(track, 'small')}</div>`;
      });
      html += `</div>`;
    }

    const autoPlaylists = playlists.filter(p => p.type === 'auto');
    if (autoPlaylists.length > 0) {
      html += `<div class="section-header"><h2>Smart Playlists</h2></div><div class="h-scroll">`;
      for (const pl of autoPlaylists) {
        const plTracks = await this.getAutoPlaylistTracks(pl.id);
        html += `<div class="h-scroll-item" onclick="UI.navigate('playlist-detail', {playlistId: '${pl.id}'})">
          <div class="grid-art" style="background:linear-gradient(135deg, rgba(var(--accent-rgb),0.2), var(--bg-elevated));display:flex;align-items:center;justify-content:center;">
            <span style="font-size:28px;font-weight:900;color:var(--accent);">${pl.name[0]}</span>
          </div>
          <span class="grid-title">${Utils.escapeHtml(pl.name)}</span>
          <span class="grid-subtitle">${plTracks.length} tracks</span>
        </div>`;
      }
      html += `</div>`;
    }

    if (favorites.length > 0) {
      html += `<div class="section-header"><h2>Favorites</h2><button class="section-action" onclick="UI.navigate('favorites')">View All</button></div>`;
      html += `<div class="grid-container grid-cols-2">`;
      favorites.slice(0, 6).forEach(track => {
        html += `<div class="grid-item" onclick="UI.playTrackById('${track.id}')">${this.renderAlbumCard(track)}</div>`;
      });
      html += `</div>`;
    }

    container.innerHTML = html;
  },

  renderSearch(container) {
    // Search is now an inline top-bar interaction. Keep this route harmless for old bookmarks.
    container.innerHTML = '<div class="empty-state">Use the search icon in the top bar to search your library.</div>';
    this.openGlobalSearch();
  },

  ensureGlobalSearch() {
    let panel = document.getElementById('global-search');
    if (panel) return panel;
    const topBar = document.querySelector('.top-bar');
    if (!topBar) return null;
    panel = document.createElement('div');
    panel.id = 'global-search';
    panel.className = 'global-search';
    panel.innerHTML = `
      <div class="global-search-field">
        ${appIcon('search')}
        <input id="global-search-input" type="search" inputmode="search" autocomplete="off" spellcheck="false" placeholder="Search songs, albums, artists…">
        <button type="button" class="global-search-close" id="global-search-close" aria-label="Close search">${appIcon('close')}</button>
      </div>
      <div class="global-search-results" id="global-search-results" hidden></div>`;
    topBar.appendChild(panel);
    const input = panel.querySelector('#global-search-input');
    input?.addEventListener('input', Utils.debounce((e) => this.runGlobalSearch(e.target.value), 90));
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeGlobalSearch();
    });
    panel.querySelector('#global-search-close')?.addEventListener('click', () => this.closeGlobalSearch());
    return panel;
  },

  openGlobalSearch(prefill='') {
    const panel = this.ensureGlobalSearch();
    const topBar = document.querySelector('.top-bar');
    const input = document.getElementById('global-search-input');
    if (!panel || !topBar || !input) return;
    topBar.classList.add('searching');
    panel.classList.add('open');
    input.value = prefill;
    requestAnimationFrame(() => input.focus());
    if (prefill.trim()) this.runGlobalSearch(prefill);
  },

  toggleGlobalSearch() {
    const panel = this.ensureGlobalSearch();
    if (!panel) return;
    panel.classList.contains('open') ? this.closeGlobalSearch() : this.openGlobalSearch();
  },

  closeGlobalSearch() {
    const panel = document.getElementById('global-search');
    const topBar = document.querySelector('.top-bar');
    const input = document.getElementById('global-search-input');
    const results = document.getElementById('global-search-results');
    if (input) input.value = '';
    if (results) { results.hidden = true; results.innerHTML = ''; }
    panel?.classList.remove('open');
    topBar?.classList.remove('searching');
  },

  async runGlobalSearch(query) {
    const q = String(query || '').trim();
    const resultsEl = document.getElementById('global-search-results');
    if (!resultsEl) return;
    if (!q) { resultsEl.hidden = true; resultsEl.innerHTML = ''; return; }
    try {
      const tracks = await Data.searchTracks(q, {});
      if (!tracks.length) {
        resultsEl.hidden = false;
        resultsEl.innerHTML = '<div class="global-search-empty">No results found</div>';
        return;
      }
      const shown = tracks.slice(0, 12);
      resultsEl.hidden = false;
      resultsEl.innerHTML = shown.map((track, i) => {
        const art = this.getArtworkUrl(track);
        return `<button class="global-search-result" type="button" data-track-id="${Utils.escapeHtml(String(track.id))}">
          <img src="${Utils.escapeHtml(art)}" alt="" loading="lazy">
          <span class="global-search-result-copy"><strong>${Utils.escapeHtml(track.title || 'Unknown')}</strong><small>${Utils.escapeHtml(track.artist || 'Unknown Artist')} · ${Utils.escapeHtml(track.album || 'Unknown Album')}</small></span>
        </button>`;
      }).join('');
      resultsEl.querySelectorAll('.global-search-result').forEach(btn => btn.addEventListener('click', () => {
        const id = btn.dataset.trackId;
        this.closeGlobalSearch();
        this.playTrackById(id);
      }));
    } catch (err) {
      console.error('Global search failed:', err);
      resultsEl.hidden = false;
      resultsEl.innerHTML = '<div class="global-search-empty">Search is temporarily unavailable.</div>';
    }
  },

  async handleSearch(query) { return this.runGlobalSearch(query); },

  async renderTracks(container, params = {}) {
    let tracks = await this.getFilteredTracks(params);
    tracks = this.getSortedTracks(tracks, params.sortBy, params.sortDir);

    const viewStyle = SettingsManager.get('ui.gridViewStyle') || 'list';
    const isGrid = viewStyle === 'grid';

    let html = '<div class="view-toolbar">';
    html += '<div class="view-toolbar-left">';
    if (this.isSelectionMode) {
      html += `<button class="icon-btn small" onclick="UI.clearSelection()" title="Clear">${appIcon('remove')}</button>`;
      html += `<span style="font-size:13px;color:var(--text-secondary);font-weight:600;">${this.selectedTracks.size} selected</span>`;
      html += `<button class="icon-btn small" onclick="UI.addSelectedToQueue()" title="Add to Queue">${appIcon('addPlayNext')}</button>`;
      html += `<button class="icon-btn small" onclick="UI.showPlaylistModal()" title="Add to Playlist">${appIcon('addPlaylist')}</button>`;
    } else {
      const sortBy = params.sortBy || this.currentSortBy || 'title';
      const sortDir = params.sortDir || this.currentSortDir || 'asc';
      this.currentSortBy = sortBy;
      this.currentSortDir = sortDir;
      html += `<select class="sort-select" onchange="UI.sortTracks(this.value)" aria-label="Sort tracks by">`;
      html += `<option value="title" ${sortBy === 'title' ? 'selected' : ''}>Title</option>`;
      html += `<option value="artist" ${sortBy === 'artist' ? 'selected' : ''}>Artist</option>`;
      html += `<option value="album" ${sortBy === 'album' ? 'selected' : ''}>Album</option>`;
      html += `<option value="duration" ${sortBy === 'duration' ? 'selected' : ''}>Duration</option>`;
      html += `<option value="playCount" ${sortBy === 'playCount' ? 'selected' : ''}>Plays</option>`;
      html += `<option value="dateAdded" ${sortBy === 'dateAdded' ? 'selected' : ''}>Date Added</option>`;
      html += `</select>`;
      html += `<button class="icon-btn small sort-dir-btn" onclick="UI.toggleSortDir()" title="Sort ${sortDir === 'asc' ? 'ascending' : 'descending'}" aria-label="Sort ${sortDir === 'asc' ? 'ascending' : 'descending'}"><span class="sort-direction-label">${sortDir === 'asc' ? '↑' : '↓'}</span>${appIcon('sort')}</button>`;
    }
    html += '</div>';
    html += '<div class="view-toolbar-right">';
    html += `<button class="view-toggle-btn ${!isGrid ? 'active' : ''}" onclick="SettingsManager.set('ui.gridViewStyle', 'list'); UI.renderCurrentPage()">${appIcon('tracks')}</button>`;
    html += `<button class="view-toggle-btn ${isGrid ? 'active' : ''}" onclick="SettingsManager.set('ui.gridViewStyle', 'grid'); UI.renderCurrentPage()">${appIcon('grid')}</button>`;
    html += '</div></div>';

    if (tracks.length === 0) {
      html += this.renderEmptyState('No tracks found');
      container.innerHTML = html;
      return;
    }

    if (isGrid) {
      const cols = SettingsManager.get('ui.gridColumns');
      let colClass = 'grid-cols-2';
      if (cols === '3') colClass = 'grid-cols-3';
      else if (cols === '4') colClass = 'grid-cols-4';
      else if (cols === '5') colClass = 'grid-cols-5';
      html += `<div class="grid-container ${colClass}">`;
      tracks.forEach(track => {
        html += `<div class="grid-item" onclick="UI.playTrackById('${track.id}')">${this.renderAlbumCard(track)}</div>`;
      });
      html += '</div>';
    } else {
      html += '<div class="track-list">';
      tracks.forEach((track, i) => {
        html += this.renderTrackRow(track, i + 1);
      });
      html += '</div>';
    }

    container.innerHTML = html;
  },

  getCollectionViewStyle() {
    const configured = SettingsManager.get('ui.gridViewStyle');
    return ['grid','list','collage'].includes(configured) ? configured : 'grid';
  },

  getGridColumnClass() {
    const cols = SettingsManager.get('ui.gridColumns');
    return cols === '3' ? 'grid-cols-3' : cols === '4' ? 'grid-cols-4' : cols === '5' ? 'grid-cols-5' : 'grid-cols-2';
  },

  collectionViewToolbar(title) {
    const mode = this.getCollectionViewStyle();
    const cols = SettingsManager.get('ui.gridColumns') || 'auto';
    let html = '<div class="view-toolbar collection-toolbar">';
    html += `<div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">${Utils.escapeHtml(title)}</h2></div>`;
    html += '<div class="view-toolbar-right">';
    html += '<div class="collection-view-modes">';
    html += `<button class="view-toggle-btn ${mode === 'list' ? 'active' : ''}" onclick="SettingsManager.set('ui.gridViewStyle','list'); UI.renderCurrentPage()" title="List view" aria-label="List view">${appIcon('tracks')}</button>`;
    html += `<button class="view-toggle-btn ${mode === 'grid' ? 'active' : ''}" onclick="SettingsManager.set('ui.gridViewStyle','grid'); UI.renderCurrentPage()" title="Grid view" aria-label="Grid view">${appIcon('grid')}</button>`;
    html += `<button class="view-toggle-btn ${mode === 'collage' ? 'active' : ''}" onclick="SettingsManager.set('ui.gridViewStyle','collage'); UI.renderCurrentPage()" title="Collage view" aria-label="Collage view">${appIcon('grid')}</button>`;
    html += '</div>';
    if (mode !== 'list') {
      html += `<select class="sort-select collection-columns-select" onchange="SettingsManager.set('ui.gridColumns', this.value); UI.renderCurrentPage()" aria-label="Grid columns">`;
      html += `<option value="auto" ${cols === 'auto' ? 'selected' : ''}>Auto</option>`;
      ['2','3','4','5'].forEach(c => html += `<option value="${c}" ${cols === c ? 'selected' : ''}>${c} columns</option>`);
      html += '</select>';
    }
    html += '</div></div>';
    return html;
  },

  collectionVariantStyle(id, index, kind='grid') {
    let h = 2166136261 >>> 0;
    for (const ch of String(id || index)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    const rand = () => { h += 0x6D2B79F5; let t=h; t=Math.imul(t^(t>>>15),t|1); t^=t+Math.imul(t^(t>>>7),t|61); return ((t^(t>>>14))>>>0)/4294967296; };
    const ratios = ['1/1','4/5','5/4','3/4','4/3','1/1'];
    const ratio = ratios[Math.floor(rand()*ratios.length)];
    const span = rand() > 0.86 ? 2 : 1;
    if (kind === 'collage') {
      // Clean collage: varied photo proportions and stacking order, but no
      // diagonal rotation or drifting offsets.
      const z = Math.round(rand()*100);
      return `--collection-ratio:${ratio};--collection-span:${span};--collection-z:${z}`;
    }
    const lift = Math.round(rand()*5);
    return `--collection-ratio:${ratio};--collection-span:${span};--collection-lift:${lift}px`;
  },

  openArtist(name) {
    const clean = String(name || '').trim();
    if (clean) this.navigate('artist-detail', { artist: clean });
  },

  openAlbum(id) {
    const clean = String(id || '').trim();
    if (clean) this.navigate('album-detail', { albumId: clean });
  },

  playEncodedIds(encoded, startIndex = 0) {
    try {
      const ids = JSON.parse(decodeURIComponent(String(encoded || '')));
      if (Array.isArray(ids)) this.playTracksByIds(ids, Number(startIndex) || 0);
    } catch (e) { console.warn('Could not decode track list', e); }
  },

  shuffleArtistEncoded(encoded) {
    try {
      const name = decodeURIComponent(String(encoded || ''));
      if (name) this.shuffleArtist(name);
    } catch (e) { console.warn('Could not decode artist name', e); }
  },

  getRepresentativeTrack(tracks) {
    return (Array.isArray(tracks) ? tracks : []).find(t => t && (t.artworkBlob || t.artwork)) || (Array.isArray(tracks) ? tracks[0] : null) || null;
  },

  renderAlbumListItem(album) {
    const tracksCount = album.trackCount ?? album.tracks?.length ?? 0;
    return `<div class="collection-list-item" data-album-id="${Utils.escapeHtml(String(album.id || ''))}" onclick="UI.openAlbum(this.dataset.albumId)">
      <div class="collection-list-art">${album._artwork ? `<img src="${album._artwork}" alt="">` : this.getAlbumArtwork(album, [])}</div>
      <div class="collection-list-info"><strong>${Utils.escapeHtml(album.name || 'Unknown Album')}</strong><span>${Utils.escapeHtml(album.artist || 'Unknown Artist')} · ${tracksCount} tracks</span></div>
      <span class="collection-list-chevron">${appIcon('next')}</span>
    </div>`;
  },

  renderArtistListItem(artist) {
    const count = artist.tracks?.length || artist.trackCount || 0;
    return `<div class="collection-list-item" data-artist-name="${Utils.escapeHtml(artist.name || '')}" onclick="UI.openArtist(this.dataset.artistName)">
      <div class="collection-list-art circle">${artist._artwork ? `<img src="${artist._artwork}" alt="">` : this.getArtistArtwork(artist, [])}</div>
      <div class="collection-list-info"><strong>${Utils.escapeHtml(artist.name || 'Unknown Artist')}</strong><span>${count} tracks · ${artist.albums?.length || 0} albums</span></div>
      <span class="collection-list-chevron">${appIcon('next')}</span>
    </div>`;
  },

  async renderAlbums(container) {
    const albums = await Data.getAll('albums');
    const allTracks = await Data.getTracks();
    let html = this.collectionViewToolbar('Albums');
    if (albums.length === 0) { html += this.renderEmptyState('No albums yet'); container.innerHTML = html; return; }
    const list = [...albums].map(a => {
      const tracks = allTracks.filter(t => t.album === a.name);
      const rep = this.getRepresentativeTrack(tracks);
      return {...a, trackCount: tracks.length, _artwork: rep ? this.getArtworkUrl(rep) : 'assets/default-art.png'};
    }).sort((a,b) => String(a.name||'').localeCompare(String(b.name||''), undefined, {numeric:true,sensitivity:'base'}));
    const mode = this.getCollectionViewStyle();
    if (mode === 'list') {
      html += '<div class="collection-list">' + list.map(a => this.renderAlbumListItem(a)).join('') + '</div>';
    } else {
      html += `<div class="grid-container ${this.getGridColumnClass()} ${mode === 'collage' ? 'collage collection-collage' : 'collection-gallery-grid'}">`;
      list.forEach((album,i) => {
        const style = this.collectionVariantStyle(album.id,i,mode);
        html += `<div class="grid-item collection-card-item" data-collection-kind="album" style="${style}" data-album-id="${Utils.escapeHtml(String(album.id || ''))}" onclick="UI.openAlbum(this.dataset.albumId)">${this.renderAlbumCard({...album, artwork: album._artwork, tracks: []})}</div>`;
      });
      html += '</div>';
    }
    container.innerHTML = html;
  },

  async renderArtists(container) {
    const artists = await Data.getAll('artists');
    const allTracks = await Data.getTracks();
    let html = this.collectionViewToolbar('Artists');
    if (artists.length === 0) { html += this.renderEmptyState('No artists yet'); container.innerHTML = html; return; }
    const list = [...artists].map(a => {
      const trackIds = Array.isArray(a.tracks) ? new Set(a.tracks.map(String)) : new Set();
      const tracks = trackIds.size ? allTracks.filter(t => trackIds.has(String(t.id))) : allTracks.filter(t => [...Utils.splitArtists(t.artist || ''), ...(t.featuredArtists || [])].some(n => String(n).trim().toLowerCase() === String(a.name || '').trim().toLowerCase()));
      const rep = this.getRepresentativeTrack(tracks);
      return {...a, trackCount: tracks.length || a.tracks?.length || 0, _artwork: rep ? this.getArtworkUrl(rep) : 'assets/default-art.png'};
    }).sort((a,b) => String(a.name||'').localeCompare(String(b.name||''), undefined, {numeric:true,sensitivity:'base'}));
    const mode = this.getCollectionViewStyle();
    if (mode === 'list') {
      html += '<div class="collection-list">' + list.map(a => this.renderArtistListItem(a)).join('') + '</div>';
    } else {
      html += `<div class="grid-container ${this.getGridColumnClass()} ${mode === 'collage' ? 'collage collection-collage' : 'collection-gallery-grid'}">`;
      list.forEach((artist,i) => {
        const style = this.collectionVariantStyle(artist.id,i,mode);
        html += `<div class="grid-item collection-card-item" data-collection-kind="artist" style="${style}" data-artist-name="${Utils.escapeHtml(artist.name || '')}" onclick="UI.openArtist(this.dataset.artistName)">${this.renderArtistCard({...artist, _artwork: artist._artwork, tracks: []})}</div>`;
      });
      html += '</div>';
    }
    container.innerHTML = html;
  },

  async renderGenres(container) {
    const genres = await Data.getAll('genres');
    let html = '<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Genres</h2></div></div>';

    if (genres.size === 0) {
      html += this.renderEmptyState('No genres yet');
      container.innerHTML = html;
      return;
    }

    const genreList = [...genres].sort((a,b) => a.name.localeCompare(b.name));
    html += '<div class="grid-container grid-cols-2">';
    genreList.forEach(genre => {
      html += `<div class="grid-item" onclick="UI.navigate('tracks', {genre: '${Utils.escapeHtml(genre.name)}'})">${this.renderGenreCard(genre)}</div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  },

  async renderPlaylists(container) {
    const playlists = await Data.getPlaylists();
    let html = '<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Playlists</h2></div><button class="btn-gold" onclick="UI.createPlaylist()">New Playlist</button></div>';

    if (playlists.length === 0) {
      html += this.renderEmptyState('No playlists yet');
      container.innerHTML = html;
      return;
    }

    html += '<div class="track-list">';
    for (const pl of playlists) {
      html += this.renderPlaylistCard(pl);
    }
    html += '</div>';
    container.innerHTML = html;
  },

  async renderPlaylistDetail(container, params) {
    const pl = await Data.getPlaylist(params.playlistId);
    if (!pl) { this.navigate('playlists'); return; }

    const tracks = await this.getTracksByPlaylist(pl);
    let html = '<div class="album-detail-header">';
    html += `<div class="album-detail-art">${this.getPlaylistArtwork(pl, tracks)}</div>`;
    html += `<div class="album-detail-info">`;
    html += `<div class="album-detail-label">Playlist</div>`;
    html += `<div class="album-detail-title">${Utils.escapeHtml(pl.name)}</div>`;
    html += `<div class="album-detail-meta">${tracks.length} tracks</div>`;
    html += `<div class="album-detail-actions">`;
    html += `<button class="btn-gold" onclick="UI.playTracksByIds([${tracks.map(t => `'${t.id}'`).join(',')}], 0)">Play</button>`;
    html += `<button class="btn-outline" onclick="UI.shufflePlaylist('${pl.id}')">Shuffle</button>`;
    html += `<button class="btn-outline" onclick="UI.sortPlaylist('${pl.id}')">${appIcon('sortPlaylist')} Sort</button>`;
    if (pl.type === 'user') html += `<button class="btn-outline danger" onclick="UI.removeArtistsFromPlaylist('${pl.id}')">${appIcon('removeArtists')} Remove Artists</button>`;
    if (pl.type === 'user') {
      html += `<button class="btn-outline" onclick="UI.exportPlaylistM3U('${pl.id}')">Export</button>`;
      html += `<button class="btn-outline danger" onclick="UI.deletePlaylist('${pl.id}')">Delete</button>`;
    }
    html += `</div></div></div>`;

    if (tracks.length > 0) {
      html += '<div class="track-list">';
      tracks.forEach((track, i) => {
        html += this.renderTrackRow(track, i + 1);
      });
      html += '</div>';
    } else {
      html += this.renderEmptyState('Empty playlist');
    }

    container.innerHTML = html;
  },

  async renderQueue(container) {
    const queue = Player.queue;
    const currentIdx = Player.queueIndex;

    let html = '<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Queue</h2></div><button class="btn-outline" onclick="Player.setQueue([],0)">Clear</button></div>';

    if (queue.length === 0) {
      html += this.renderEmptyState('Queue is empty');
      container.innerHTML = html;
      return;
    }

    html += '<div class="track-list">';
    queue.forEach((track, i) => {
      const isCurrent = i === currentIdx;
      html += `
        <div class="track-row ${isCurrent ? 'playing' : ''}" draggable="true" ondragstart="UI.dragQueueStart(event, ${i})" ondragover="UI.dragQueueOver(event)" ondrop="UI.dragQueueDrop(event, ${i})">
          <div class="queue-num">${isCurrent ? '<div class="playing-bars"><span></span><span></span><span></span></div>' : (i + 1)}</div>
          <img class="track-art" src="${this.getArtworkUrl(track)}" alt="">
          <div class="track-info">
            <span class="track-title">${Utils.escapeHtml(track.title)}</span>
            <span class="track-meta">${Utils.escapeHtml(track.artist)}</span>
          </div>
          <span class="track-duration">${Utils.formatDuration(track.duration)}</span>
          <div class="track-actions">
            <button class="icon-btn small" onclick="Player.removeFromQueue(${i}); event.stopPropagation();">
              ${appIcon('remove')}
            </button>
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  },

  dragQueueStart(e, index) { e.dataTransfer.setData('text/plain', index); },
  dragQueueOver(e) { e.preventDefault(); },
  dragQueueDrop(e, toIndex) {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (fromIndex !== toIndex) Player.moveQueueItem(fromIndex, toIndex);
  },

  async renderLyrics(container) {
    const track = Player.currentTrack;
    if (!track) {
      container.innerHTML = this.renderEmptyState('No track playing');
      return;
    }

    let lyrics = null;
    let source = 'none';

    if (track.lyrics) {
      lyrics = track.lyrics;
      source = 'embedded';
    } else if (track.lyricsLrc) {
      lyrics = Utils.lrcParse(track.lyricsLrc);
      source = 'lrc';
    } else if (track.lyricsTtml) {
      lyrics = Utils.ttmlParse(track.lyricsTtml);
      source = 'ttml';
    }

    let html = `<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Lyrics</h2></div></div>`;
    html += `<div style="text-align:center;margin-bottom:20px;"><p style="color:var(--text-secondary);font-size:14px;font-weight:600;">${Utils.escapeHtml(track.title)} - ${Utils.escapeHtml(track.artist)}</p></div>`;

    if (!SettingsManager.get('lyrics.enabled')) {
      html += `<div class="lyrics-container"><p style="color:var(--text-tertiary);font-size:16px;">Lyrics are disabled in Settings.</p></div>`;
      container.innerHTML = html;
      if (this.lyricsInterval) { clearInterval(this.lyricsInterval); this.lyricsInterval = null; }
      return;
    }

    if (!lyrics || lyrics.length === 0) {
      html += `<div class="lyrics-container"><p style="color:var(--text-tertiary);font-size:16px;">No lyrics available</p></div>`;
      html += `<button class="btn-outline btn-full" onclick="UI.renderLyricsEditor(document.getElementById('page-container'))">Add Lyrics</button>`;
      container.innerHTML = html;
      return;
    }

    const lyricAlign = SettingsManager.get('lyrics.alignCenter') ? 'center' : 'left';
    const lyricSize = SettingsManager.get('lyrics.fontSize') || 16;
    html += `<div class="lyrics-container" id="lyrics-container" style="text-align:${lyricAlign};">`;
    lyrics.forEach((line, i) => {
      html += `<div class="lyric-line" id="lyric-${i}" data-time="${line.time}" style="font-size:${lyricSize}px;">${Utils.escapeHtml(line.text)}</div>`;
    });
    html += `</div>`;
    html += `<button class="btn-outline btn-full" style="margin-top:20px;" onclick="UI.renderLyricsEditor(document.getElementById('page-container'))">Edit Lyrics</button>`;
    container.innerHTML = html;

    this.lyricsInterval = setInterval(() => this.highlightLyric(lyrics), 200);
  },

  highlightLyric(lyrics) {
    const current = Player.getCurrentTime();
    let activeIdx = -1;
    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i].time <= current) activeIdx = i;
    }
    if (activeIdx === this.lastLyricIndex) return;
    this.lastLyricIndex = activeIdx;

    const lines = document.querySelectorAll('.lyric-line');
    lines.forEach((line, i) => {
      line.classList.toggle('active', i === activeIdx);
    });
    if (activeIdx >= 0 && SettingsManager.get('lyrics.highlightCurrentLine')) {
      const activeLine = document.getElementById('lyric-' + activeIdx);
      if (activeLine) activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },

  renderLyricsEditor(container) {
    const track = Player.currentTrack;
    if (!track) return;
    let html = `<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Edit Lyrics</h2></div></div>`;
    html += `<textarea id="lyrics-editor" style="width:100%;min-height:300px;background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:16px;color:var(--text-primary);font-family:inherit;font-size:14px;resize:vertical;outline:none;line-height:1.6;" placeholder="Paste lyrics here...">${Utils.escapeHtml(track.lyrics || '')}</textarea>`;
    html += `<div style="display:flex;gap:10px;margin-top:16px;"><button class="btn-gold" onclick="UI.saveLyrics()">Save</button><button class="btn-outline" onclick="UI.navigate('lyrics')">Cancel</button></div>`;
    container.innerHTML = html;
  },

  async saveLyrics() {
    const track = Player.currentTrack;
    if (!track) return;
    const lyrics = document.getElementById('lyrics-editor').value;
    track.lyrics = lyrics;
    await Data.saveTrack(track);
    this.navigate('lyrics');
  },

  async renderFolders(container) {
    const tracks = await Data.getTracks();
    const folders = {};
    tracks.forEach(t => {
      const folder = t.folder || 'Unknown';
      if (!folders[folder]) folders[folder] = [];
      folders[folder].push(t);
    });

    let html = '<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Folders</h2></div></div>';

    if (Object.keys(folders).length === 0) {
      html += this.renderEmptyState('No folders');
      container.innerHTML = html;
      return;
    }

    html += '<div class="track-list">';
    Object.entries(folders).sort((a,b) => a[0].localeCompare(b[0])).forEach(([folder, folderTracks]) => {
      html += `<div class="folder-card" onclick="UI.navigate('tracks', {folder: '${Utils.escapeHtml(folder)}'})">
        ${appIcon('folders')}
        <span class="folder-path">${Utils.escapeHtml(folder)}</span>
        <span style="color:var(--text-tertiary);font-size:13px;font-weight:600;">${folderTracks.length} tracks</span>
      </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  },

  async renderFavorites(container) {
    const tracks = await Data.getTracks();
    const favorites = tracks.filter(t => t.favorite);
    let html = '<div class="view-toolbar"><div class="view-toolbar-left"><h2 style="font-size:18px;font-weight:800;">Favorites</h2></div></div>';

    if (favorites.length === 0) {
      html += this.renderEmptyState('No favorites yet');
      container.innerHTML = html;
      return;
    }

    html += '<div class="track-list">';
    favorites.forEach((track, i) => {
      html += this.renderTrackRow(track, i + 1);
    });
    html += '</div>';
    container.innerHTML = html;
  },

  renderAudioEffects(container) {
    const s = CONFIG.audio;
    const presets = s.eqPresets || [];
    const freqs = [60, 250, 1000, 4000, 16000];
    const selectedPreset = s.eqCurrentPreset || 'Flat';
    const presetValues = presets.find(p => p.name === selectedPreset)?.values;
    const values = selectedPreset === 'Custom'
      ? (Array.isArray(s.eqCustomValues) ? s.eqCustomValues : Array(5).fill(0))
      : (presetValues || Array(5).fill(0));
    const pitch = Number(s.pitchSemitones || 0);
    const speed = Number(s.playbackSpeed || 1);
    const boost = Number(s.volumeBoost || 1);
    const boostEnabled = !!s.volumeBoostEnabled;

    let html = `<div class="view-toolbar audio-effects-toolbar">
      <div class="view-toolbar-left">
        <button class="icon-btn" onclick="UI.navigate('home')" aria-label="Back">${appIcon('previous')}</button>
        <div><h2 class="audio-effects-title">Audio Effects</h2><p class="audio-effects-kicker">Playback controls</p></div>
      </div>
    </div>`;

    html += `<main class="effects-page-modern">
      <section class="effects-modern-section effects-modern-eq">
        <div class="effects-modern-head">
          <div>
            <span class="effects-modern-overline">EQUALIZER</span>
            <h3>5-band EQ</h3>
          </div>
          <label class="switch-modern" title="Enable equalizer">
            <input type="checkbox" ${s.equalizerEnabled ? 'checked' : ''} onchange="SettingsManager.set('audio.equalizerEnabled', this.checked)">
            <span></span>
          </label>
        </div>

        <div class="effects-modern-toolbar">
          <label class="effects-modern-select">
            <span>Preset</span>
            <select onchange="UI.setEqPreset(this.value)">
              ${presets.map(p => `<option value="${Utils.escapeHtml(p.name)}" ${selectedPreset === p.name ? 'selected' : ''}>${Utils.escapeHtml(p.name)}</option>`).join('')}
              <option value="Custom" ${selectedPreset === 'Custom' ? 'selected' : ''}>Custom</option>
            </select>
          </label>
          <button class="effects-modern-action" type="button" onclick="UI.resetEqualizer()">Reset</button>
        </div>

        <div class="eq-modern-grid">
          ${freqs.map((f, i) => {
            const v = Number(values[i] || 0);
            return `<div class="eq-modern-band">
              <div class="eq-modern-value" id="eq-value-${i}">${v > 0 ? '+' : ''}${v} dB</div>
              <div class="eq-modern-track">
                <span class="eq-modern-rail"></span>
                <span class="eq-modern-fill"></span>
                <span class="eq-modern-zero"></span>
                <span class="eq-modern-knob"></span>
                <input class="eq-modern-input" aria-label="${f} Hz EQ" type="range" min="-12" max="12" step="0.5" value="${v}" oninput="UI.setEqBand(${i}, this.value); UI.updateEqVisual(this, ${i})">
              </div>
              <div class="eq-modern-frequency">${f >= 1000 ? `${f/1000}k` : f}<span>Hz</span></div>
            </div>`;
          }).join('')}
        </div>
        <div class="eq-modern-scale"><span>-12 dB</span><span>0</span><span>+12 dB</span></div>
      </section>

      <section class="effects-modern-section">
        <div class="effects-modern-head">
          <div>
            <span class="effects-modern-overline">PLAYBACK</span>
            <h3>Pitch</h3>
            <p>Shift the song pitch independently.</p>
          </div>
          ${appIcon('pitchSpeed')}
        </div>
        <div class="modern-range-block">
          <div class="modern-range-value-row"><span>Pitch</span><strong id="pitch-value">${pitch > 0 ? '+' : ''}${pitch} st</strong></div>
          <input class="modern-range" id="pitch-range" type="range" min="-6" max="6" step="1" value="${Math.max(-6, Math.min(6, Math.round(pitch)))}" oninput="UI.setPitch(this.value, this)">
          <div class="modern-range-scale"><span>-6 st</span><span>Neutral</span><span>+6 st</span></div>
        </div>
        <button class="modern-inline-reset" type="button" onclick="UI.resetPitch()">Reset Pitch</button>
      </section>

      <section class="effects-modern-section">
        <div class="effects-modern-head">
          <div>
            <span class="effects-modern-overline">PLAYBACK</span>
            <h3>Speed</h3>
            <p>Change playback tempo without changing the pitch setting.</p>
          </div>
          ${appIcon('playAfterSeconds')}
        </div>
        <div class="modern-range-block">
          <div class="modern-range-value-row"><span>Speed</span><strong id="speed-value">${speed.toFixed(2)}×</strong></div>
          <input class="modern-range" id="speed-range" type="range" min="0.5" max="2" step="0.05" value="${speed.toFixed(2)}" oninput="UI.setSpeed(this.value, this)">
          <div class="modern-range-scale"><span>0.50×</span><span>1.00×</span><span>2.00×</span></div>
        </div>
        <button class="modern-inline-reset" type="button" onclick="UI.resetSpeed()">Reset Speed</button>
      </section>

      <section class="effects-modern-section">
        <div class="effects-modern-head">
          <div>
            <span class="effects-modern-overline">OUTPUT</span>
            <h3>Volume Boost</h3>
            <p>Additional playback gain</p>
          </div>
          <label class="switch-modern" title="Enable volume boost">
            <input type="checkbox" ${boostEnabled ? 'checked' : ''} onchange="SettingsManager.set('audio.volumeBoostEnabled', this.checked)">
            <span></span>
          </label>
        </div>
        <div class="modern-range-block">
          <div class="modern-range-value-row"><span>Boost</span><strong id="boost-value">${Math.round(boost * 100)}%</strong></div>
          <input class="modern-range volume-boost-drag" id="volume-boost-range" type="range" min="0.5" max="2.5" step="0.05" value="${boost}" ${boostEnabled ? '' : 'disabled'} oninput="UI.setEffectValue('volumeBoost', this.value, this)" aria-label="Volume Boost">
          <div class="modern-range-scale"><span>50%</span><span>100%</span><span>250%</span></div>
        </div>
        <button class="modern-inline-reset" type="button" onclick="UI.resetVolumeBoost()">Reset Boost</button>
      </section>
    </main>`;

    container.innerHTML = html;
    container.querySelectorAll('.eq-modern-input').forEach((input, i) => this.updateEqVisual(input, i));
    container.querySelectorAll('.modern-range').forEach(input => this.updateRangeProgress(input));
    this.updatePitchSpeedVisual(combined);
  },

  resetEqualizer() {
    const flat = Array(5).fill(0);
    SettingsManager.set('audio.eqCurrentPreset', 'Flat', { notify: false });
    SettingsManager.set('audio.eqCustomValues', flat, { notify: false });
    Player.applyEQPreset();
    this.refreshAudioEffectsViews();
  },

  resetPitchSpeed() {
    SettingsManager.set('audio.pitchSemitones', 0, { notify: false });
    SettingsManager.set('audio.playbackSpeed', 1, { notify: false });
    Player.applyPlaybackEffects();
    this.refreshAudioEffectsViews();
  },

  resetVolumeBoost() {
    SettingsManager.set('audio.volumeBoost', 1, { notify: false });
    SettingsManager.set('audio.volumeBoostEnabled', false, { notify: false });
    Player.applyPlaybackEffects();
    this.refreshAudioEffectsViews();
  },

  refreshAudioEffectsViews() {
    if (this.currentPage === 'audio-effects') this.renderCurrentPage();
    if (document.getElementById('audio-effects-overlay')?.classList.contains('open')) this.openAudioEffectsOverlay();
  },
  setEqPreset(name) {
    SettingsManager.set('audio.eqCurrentPreset', name);
    if (name !== 'Custom') {
      const preset = CONFIG.audio.eqPresets.find(p=>p.name===name);
      if (preset) SettingsManager.set('audio.eqCustomValues', [...preset.values]);
    }
    this.renderCurrentPage();
  },

  setPitch(value, sourceEl = null) {
    const n = Math.max(-6, Math.min(6, Math.round(Number(value) || 0)));
    SettingsManager.set('audio.pitchSemitones', n, { notify: false });
    Player.applyPlaybackEffects();
    this.updateEffectValueDisplays();
    if (sourceEl) this.updateRangeProgress(sourceEl);
  },

  setSpeed(value, sourceEl = null) {
    const n = Math.max(0.5, Math.min(2, Number(value) || 1));
    SettingsManager.set('audio.playbackSpeed', n, { notify: false });
    Player.applyPlaybackEffects();
    this.updateEffectValueDisplays();
    if (sourceEl) this.updateRangeProgress(sourceEl);
  },

  resetPitch() {
    SettingsManager.set('audio.pitchSemitones', 0, { notify: false });
    Player.applyPlaybackEffects();
    this.refreshAudioEffectsViews();
  },

  resetSpeed() {
    SettingsManager.set('audio.playbackSpeed', 1, { notify: false });
    Player.applyPlaybackEffects();
    this.refreshAudioEffectsViews();
  },

  updateEffectValueDisplays() {
    const pitch = Math.max(-6, Math.min(6, Math.round(Number(SettingsManager.get('audio.pitchSemitones', 0)))));
    const speed = Math.max(0.5, Math.min(2, Number(SettingsManager.get('audio.playbackSpeed', 1)) || 1));
    ['pitch-value','overlay-pitch-value'].forEach(id => { const el=document.getElementById(id); if(el) el.textContent=`${pitch>0?'+':''}${pitch} st`; });
    ['speed-value','overlay-speed-value'].forEach(id => { const el=document.getElementById(id); if(el) el.textContent=`${speed.toFixed(2)}×`; });
  },

  setPitchSpeedCombined(value, sourceEl = null) {
    // Legacy compatibility: older callers now map to pitch only.
    this.setPitch(value, sourceEl);
  },

  updatePitchSpeedVisual(value) {
    this.updateEffectValueDisplays();
  },

  setEffectValue(kind, value, sourceEl = null) {
    const n = Number(value);
    if (!Number.isFinite(n)) return;
    SettingsManager.set(`audio.${kind}`, n);
    Player.applyPlaybackEffects();
    const ids = { volumeBoost:'boost-value' };
    const el = document.getElementById(ids[kind]) || document.getElementById(`overlay-${ids[kind] || ''}`);
    if (el) el.textContent = `${Math.round(n*100)}%`;
    const overlayEl = document.getElementById('overlay-boost-value');
    if (kind === 'volumeBoost' && overlayEl) overlayEl.textContent = `${Math.round(n*100)}%`;
    if (sourceEl) this.updateRangeProgress(sourceEl);
  },

  makeDragOnlyRange(input) {
    // Native range inputs are fully draggable; no custom pointer gating needed.
    if (input) input.style.touchAction = 'none';
  },

  updateEqVisual(input, index, prefix='') {
    if (!input) return;
    const value = Number(input.value) || 0;
    const min = Number(input.min ?? -12);
    const max = Number(input.max ?? 12);
    const pct = max === min ? 50 : Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
    const band = input.closest('.eq-modern-band');
    if (!band) return;
    const knob = band.querySelector('.eq-modern-knob');
    const fill = band.querySelector('.eq-modern-fill');
    const valueEl = band.querySelector(`#${prefix ? `overlay-eq-value-${index}` : `eq-value-${index}`}`) || band.querySelector('.eq-modern-value');
    const zero = 50;
    if (knob) knob.style.top = `${100 - pct}%`;
    if (fill) {
      const upper = Math.max(pct, zero);
      const lower = Math.min(pct, zero);
      fill.style.top = `${100 - upper}%`;
      fill.style.height = `${upper - lower}%`;
    }
    if (valueEl) valueEl.textContent = `${value > 0 ? '+' : ''}${value} dB`;
  },

  updateRangeProgress(input) {
    if (!input) return;
    const min = Number(input.min ?? 0);
    const max = Number(input.max ?? 100);
    const value = Number(input.value ?? min);
    const pct = max === min ? 0 : Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
    input.style.setProperty('--range-progress', `${pct}%`);
    input.style.setProperty('--eq-progress', `${pct}%`);
  },

  renderSettings(container) {
    const s = CONFIG;
    const section = this.currentPageParams?.section || null;
    const query = String(this.currentPageParams?.q || '').trim().toLowerCase();
    const row = (path, label, control, hint='') => `<div class="setting-row" data-setting-path="${Utils.escapeHtml(path)}" data-setting-search="${Utils.escapeHtml((label+' '+hint+' '+path).toLowerCase())}"><div class="setting-copy"><span>${Utils.escapeHtml(label)}</span>${hint?`<small>${Utils.escapeHtml(hint)}</small>`:''}</div>${control}</div>`;
    const toggle = (path,label,value,hint='') => row(path,label,`<label class="toggle-switch"><input type="checkbox" ${value?'checked':''} onchange="SettingsManager.set('${path}',this.checked)"><span class="toggle-slider"></span></label>`,hint);
    const number = (path,label,value,min,max,step=1,hint='') => row(path,label,`<input type="number" value="${Utils.escapeHtml(String(value))}" min="${min}" max="${max}" step="${step}" onchange="SettingsManager.set('${path}',this.value)">`,hint);
    const select = (path,label,value,opts,hint='') => row(path,label,`<select onchange="SettingsManager.set('${path}',this.value)">${opts.map(([v,t])=>`<option value="${Utils.escapeHtml(v)}" ${String(value)===String(v)?'selected':''}>${Utils.escapeHtml(t)}</option>`).join('')}</select>`,hint);
    const text = (path,label,value,hint='') => row(path,label,`<input type="text" value="${Utils.escapeHtml(String(value??''))}" onchange="SettingsManager.set('${path}',this.value)">`,hint);
    const list = (path,label,value,hint='') => row(path,label,`<input type="text" value="${Utils.escapeHtml(Array.isArray(value)?value.join(', '):String(value??''))}" onchange="SettingsManager.set('${path}',this.value.split(',').map(v=>v.trim()).filter(Boolean))">`,hint);
    const cats=[
      ['ui','UI','theme','Appearance, library UI and music player UI'],['audio','Audio','equalizer','Sound processing, effects and output'],['playback','Playback','play','Queue, skipping, timers and playback behavior'],['library','Library','tracks','Scanning, indexing and metadata extraction'],['smart','Smart Features','mostPlayed','Recommendations and activity'],['history','History','history','Listening activity and scrobbling'],['lyrics','Lyrics','lyrics','Lyrics loading and display'],['data','Data','folders','Folders and library maintenance'],['about','About','warning','Application information']
    ];
    const defs=[]; const add=(group,path,label,value,render,keywords='')=>defs.push({group,path,label,value,render,keywords});
    add('UI · Library UI','ui.gridColumns','Grid Columns',s.ui.gridColumns,()=>select('ui.gridColumns','Grid Columns',s.ui.gridColumns,[['auto','Auto'],['2','2'],['3','3'],['4','4'],['5','5']]));
    add('UI · Library UI','ui.gridViewStyle','Library View',s.ui.gridViewStyle,()=>select('ui.gridViewStyle','Library View',s.ui.gridViewStyle,[['grid','Grid'],['list','List'],['collage','Collage']]));
    add('UI · Library UI','ui.waveformSeekbar','Waveform Seekbar',s.ui.waveformSeekbar,()=>toggle('ui.waveformSeekbar','Waveform Seekbar',s.ui.waveformSeekbar));
    add('UI · Library UI','ui.waveformBars','Waveform Bars',s.ui.waveformBars,()=>number('ui.waveformBars','Waveform Bars',s.ui.waveformBars,20,300,1));
    add('UI · Library UI','ui.particlesEnabled','Particles',s.ui.particlesEnabled,()=>toggle('ui.particlesEnabled','Particles',s.ui.particlesEnabled));
    add('UI · Library UI','ui.particlesIntensity','Particle Intensity',s.ui.particlesIntensity,()=>number('ui.particlesIntensity','Particle Intensity',s.ui.particlesIntensity,0,2,.1));
    add('UI · Library UI','ui.landscapeLayout','Landscape Layout',s.ui.landscapeLayout,()=>select('ui.landscapeLayout','Landscape Layout',s.ui.landscapeLayout,[['auto','Auto'],['compact','Compact'],['expanded','Expanded']]));
    add('UI · Library UI','ui.animatingThumbnail','Animating Thumbnail',s.ui.animatingThumbnail,()=>toggle('ui.animatingThumbnail','Animating Thumbnail',s.ui.animatingThumbnail));
    add('UI · Library UI','ui.showUpdateIcon','Show Update Icon',s.ui.showUpdateIcon,()=>toggle('ui.showUpdateIcon','Show Update Icon',s.ui.showUpdateIcon));
    add('UI · Library UI','ui.albumSort','Default Album Sort',s.ui.albumSort,()=>select('ui.albumSort','Default Album Sort',s.ui.albumSort,[['name','Name'],['artist','Artist'],['year','Year'],['dateAdded','Date Added']]));
    add('UI · Library UI','ui.artistSort','Default Artist Sort',s.ui.artistSort,()=>select('ui.artistSort','Default Artist Sort',s.ui.artistSort,[['name','Name'],['trackCount','Track Count'],['dateAdded','Date Added']]));
    add('UI · Music Player UI','ui.themeMode','Theme',s.ui.themeMode,()=>select('ui.themeMode','Theme',s.ui.themeMode,[['dark','Dark'],['light','Light']]));
    add('UI · Music Player UI','ui.dynamicTheming','Dynamic Theming',s.ui.dynamicTheming,()=>toggle('ui.dynamicTheming','Dynamic Theming',s.ui.dynamicTheming));
    add('UI · Music Player UI','ui.glassmorphism','Glassmorphism',s.ui.glassmorphism,()=>toggle('ui.glassmorphism','Glassmorphism',s.ui.glassmorphism));
    add('UI · Music Player UI','ui.glassIntensity','Glass Intensity',s.ui.glassIntensity,()=>number('ui.glassIntensity','Glass Intensity',s.ui.glassIntensity,0,1,.05));
    add('UI · Music Player UI','ui.fillAlbumArt','Fill Album Art',s.ui.fillAlbumArt,()=>toggle('ui.fillAlbumArt','Fill Album Art',s.ui.fillAlbumArt));
    add('UI · Music Player UI','ui.miniplayerGlow','Mini-player Glow',s.ui.miniplayerGlow,()=>toggle('ui.miniplayerGlow','Mini-player Glow',s.ui.miniplayerGlow));
    add('UI · Music Player UI','ui.miniplayerGlowMode','Mini-player Glow Mode',s.ui.miniplayerGlowMode,()=>select('ui.miniplayerGlowMode','Mini-player Glow Mode',s.ui.miniplayerGlowMode,[['dynamic','Dynamic'],['static','Static']]));
    add('UI · Music Player UI','ui.floatingMiniPlayer','Floating Mini Player',s.ui.floatingMiniPlayer,()=>toggle('ui.floatingMiniPlayer','Floating Mini Player',s.ui.floatingMiniPlayer,'Hold the mini-player for one second.'));
    add('UI · Music Player UI','ui.floatingPlayerBlur','Floating Player Blur',s.ui.floatingPlayerBlur,()=>number('ui.floatingPlayerBlur','Floating Player Blur',s.ui.floatingPlayerBlur,0,60,1));
    add('UI · Music Player UI','ui.vibrationMode','Vibration',s.ui.vibrationMode,()=>select('ui.vibrationMode','Vibration',s.ui.vibrationMode,[['haptic','Haptic'],['none','Off']]));
    add('Audio','audio.equalizerEnabled','Equalizer',s.audio.equalizerEnabled,()=>toggle('audio.equalizerEnabled','Equalizer',s.audio.equalizerEnabled));
    add('Audio','audio.crossfadeDuration','Crossfade (seconds)',s.audio.crossfadeDuration,()=>number('audio.crossfadeDuration','Crossfade (seconds)',s.audio.crossfadeDuration,0,10,.5));
    add('Audio','audio.playPauseFadeDuration','Play / Pause Fade (seconds)',s.audio.playPauseFadeDuration,()=>number('audio.playPauseFadeDuration','Play / Pause Fade (seconds)',s.audio.playPauseFadeDuration,0,5,.1));
    add('Audio','audio.skipSilence','Skip Silence',s.audio.skipSilence,()=>toggle('audio.skipSilence','Skip Silence',s.audio.skipSilence));
    add('Audio','audio.skipSilenceThreshold','Silence Threshold (dB)',s.audio.skipSilenceThreshold,()=>number('audio.skipSilenceThreshold','Silence Threshold (dB)',s.audio.skipSilenceThreshold,-100,0,1));
    add('Audio','audio.gaplessPlayback','Gapless / Preload Next',s.audio.gaplessPlayback,()=>toggle('audio.gaplessPlayback','Gapless / Preload Next',s.audio.gaplessPlayback));
    add('Audio','audio.normalization','Volume Normalization',s.audio.normalization,()=>toggle('audio.normalization','Volume Normalization',s.audio.normalization));
    add('Audio','audio.normalizationTarget','Normalization Target (LUFS)',s.audio.normalizationTarget,()=>number('audio.normalizationTarget','Normalization Target (LUFS)',s.audio.normalizationTarget,-30,0,1));
    add('Audio','audio.pitchSemitones','Pitch (semitones)',s.audio.pitchSemitones,()=>number('audio.pitchSemitones','Pitch (semitones)',s.audio.pitchSemitones,-6,6,1));
    add('Audio','audio.playbackSpeed','Playback Speed',s.audio.playbackSpeed,()=>number('audio.playbackSpeed','Playback Speed',s.audio.playbackSpeed,.5,2,.05));
    add('Audio','audio.volumeBoostEnabled','Volume Boost',s.audio.volumeBoostEnabled,()=>toggle('audio.volumeBoostEnabled','Volume Boost',s.audio.volumeBoostEnabled));
    add('Audio','audio.volumeBoost','Boost Amount',s.audio.volumeBoost,()=>number('audio.volumeBoost','Boost Amount',s.audio.volumeBoost,.5,2.5,.05));
    add('Playback','playback.timeSkipInterval','Time Skip Interval',s.playback.timeSkipInterval,()=>select('playback.timeSkipInterval','Time Skip Interval',String(s.playback.timeSkipInterval),[['5','5 seconds'],['10','10 seconds'],['15','15 seconds']]));
    add('Playback','playback.trackPlayMode','Track Play Mode',s.playback.trackPlayMode,()=>select('playback.trackPlayMode','Track Play Mode',s.playback.trackPlayMode,[['context','Context queue'],['single','Single track'],['continuous','Continuous']]));
    add('Playback','playback.persistentQueue','Persistent Queue',s.playback.persistentQueue,()=>toggle('playback.persistentQueue','Persistent Queue',s.playback.persistentQueue));
    add('Playback','playback.autoPlayOnInsert','Autoplay Inserted Tracks',s.playback.autoPlayOnInsert,()=>toggle('playback.autoPlayOnInsert','Autoplay Inserted Tracks',s.playback.autoPlayOnInsert));
    add('Playback','playback.smartPause.onCall','Pause on Call',s.playback.smartPause.onCall,()=>toggle('playback.smartPause.onCall','Pause on Call',s.playback.smartPause.onCall));
    add('Playback','playback.smartPause.onNotification','Pause on Notification',s.playback.smartPause.onNotification,()=>toggle('playback.smartPause.onNotification','Pause on Notification',s.playback.smartPause.onNotification));
    add('Playback','playback.smartPause.onAppSwitch','Pause When App Is Hidden',s.playback.smartPause.onAppSwitch,()=>toggle('playback.smartPause.onAppSwitch','Pause When App Is Hidden',s.playback.smartPause.onAppSwitch));
    add('Playback','playback.smartPause.onVolumeZero','Pause When Volume Reaches Zero',s.playback.smartPause.onVolumeZero,()=>toggle('playback.smartPause.onVolumeZero','Pause When Volume Reaches Zero',s.playback.smartPause.onVolumeZero));
    add('Playback','playback.smartPause.onHeadphoneDisconnect','Pause on Audio Device Disconnect',s.playback.smartPause.onHeadphoneDisconnect,()=>toggle('playback.smartPause.onHeadphoneDisconnect','Pause on Audio Device Disconnect',s.playback.smartPause.onHeadphoneDisconnect));
    add('Playback','playback.sleepTimer.mode','Sleep Timer Mode',s.playback.sleepTimer.mode,()=>select('playback.sleepTimer.mode','Sleep Timer Mode',s.playback.sleepTimer.mode,[['tracks','Tracks'],['minutes','Minutes']]));
    add('Playback','playback.sleepTimer.value','Sleep Timer Value',s.playback.sleepTimer.value,()=>number('playback.sleepTimer.value','Sleep Timer Value',s.playback.sleepTimer.value,1,1440,1));
    add('Library','library.minFileSizeMB','Minimum File Size (MB)',s.library.minFileSizeMB,()=>number('library.minFileSizeMB','Minimum File Size (MB)',s.library.minFileSizeMB,0,1000,.1));
    add('Library','library.minDurationSeconds','Minimum Duration (seconds)',s.library.minDurationSeconds,()=>number('library.minDurationSeconds','Minimum Duration (seconds)',s.library.minDurationSeconds,0,3600,1));
    add('Library','library.deduplicateBy','Deduplicate By',s.library.deduplicateBy,()=>select('library.deduplicateBy','Deduplicate By',s.library.deduplicateBy,[['hash','Hash'],['path','Path']]));
    add('Library','library.extractFeaturedArtists','Extract Featured Artists',s.library.extractFeaturedArtists,()=>toggle('library.extractFeaturedArtists','Extract Featured Artists',s.library.extractFeaturedArtists));
    add('Library','library.artistSeparators','Artist Separators',s.library.artistSeparators,()=>list('library.artistSeparators','Artist Separators',s.library.artistSeparators));
    add('Library','library.genreSeparators','Genre Separators',s.library.genreSeparators,()=>list('library.genreSeparators','Genre Separators',s.library.genreSeparators));
    add('Library','library.moodTagsEnabled','Mood Tags',s.library.moodTagsEnabled,()=>toggle('library.moodTagsEnabled','Mood Tags',s.library.moodTagsEnabled));
    add('Library','library.allowMultipleAlbums','Allow Multiple Albums',s.library.allowMultipleAlbums,()=>toggle('library.allowMultipleAlbums','Allow Multiple Albums',s.library.allowMultipleAlbums));
    add('Library','library.autoIndexOnLaunch','Auto Index on Launch',s.library.autoIndexOnLaunch,()=>toggle('library.autoIndexOnLaunch','Auto Index on Launch',s.library.autoIndexOnLaunch));
    add('Library','library.indexThreads','Index Threads',s.library.indexThreads,()=>number('library.indexThreads','Index Threads',s.library.indexThreads,1,32,1));
    add('Smart Features','smart.smortEnabled','Smart Recommendations',s.smart.smortEnabled,()=>toggle('smart.smortEnabled','Smart Recommendations',s.smart.smortEnabled));
    for (const [k,label] of [['samePeriod','Match Same Period'],['sameEra','Match Same Era'],['timeRange','Use Time Range'],['ratings','Use Ratings'],['moods','Use Moods']]) add('Smart Features',`smart.smortCriteria.${k}`,label,s.smart.smortCriteria[k],()=>toggle(`smart.smortCriteria.${k}`,label,s.smart.smortCriteria[k]));
    add('Smart Features','smart.smortCriteria.random','Recommendation Randomness',s.smart.smortCriteria.random,()=>number('smart.smortCriteria.random','Recommendation Randomness',s.smart.smortCriteria.random,0,1,.05));
    add('Smart Features','smart.mostPlayedAutoUpdate','Auto-update Most Played',s.smart.mostPlayedAutoUpdate,()=>toggle('smart.mostPlayedAutoUpdate','Auto-update Most Played',s.smart.mostPlayedAutoUpdate));
    add('Smart Features','smart.mostPlayedMinPlays','Minimum Plays',s.smart.mostPlayedMinPlays,()=>number('smart.mostPlayedMinPlays','Minimum Plays',s.smart.mostPlayedMinPlays,1,100,1));
    add('Smart Features','smart.mostPlayedMaxTracks','Most Played Limit',s.smart.mostPlayedMaxTracks,()=>number('smart.mostPlayedMaxTracks','Most Played Limit',s.smart.mostPlayedMaxTracks,1,500,1));
    add('Smart Features','smart.lostMemoriesEnabled','Lost Memories',s.smart.lostMemoriesEnabled,()=>toggle('smart.lostMemoriesEnabled','Lost Memories',s.smart.lostMemoriesEnabled));
    add('Smart Features','smart.lostMemoriesYearsBack','Lost Memories Years',s.smart.lostMemoriesYearsBack,()=>list('smart.lostMemoriesYearsBack','Lost Memories Years',s.smart.lostMemoriesYearsBack));
    add('History','history.minListenSeconds','Minimum Listen Time (seconds)',s.history.minListenSeconds,()=>number('history.minListenSeconds','Minimum Listen Time (seconds)',s.history.minListenSeconds,0,3600,1));
    add('History','history.minListenPercent','Minimum Listen Percent',s.history.minListenPercent,()=>number('history.minListenPercent','Minimum Listen Percent',s.history.minListenPercent,0,100,1));
    add('History','history.scrobbleEnabled','Scrobbling',s.history.scrobbleEnabled,()=>toggle('history.scrobbleEnabled','Scrobbling',s.history.scrobbleEnabled));
    add('History','history.lastFm.username','Last.fm Username',s.history.lastFm.username,()=>text('history.lastFm.username','Last.fm Username',s.history.lastFm.username));
    add('History','history.lastFm.apiKey','Last.fm API Key',s.history.lastFm.apiKey,()=>text('history.lastFm.apiKey','Last.fm API Key',s.history.lastFm.apiKey));
    add('History','history.lastFm.apiSecret','Last.fm API Secret',s.history.lastFm.apiSecret,()=>text('history.lastFm.apiSecret','Last.fm API Secret',s.history.lastFm.apiSecret));
    add('History','history.lastFm.sessionKey','Last.fm Session Key',s.history.lastFm.sessionKey,()=>text('history.lastFm.sessionKey','Last.fm Session Key',s.history.lastFm.sessionKey));
    add('History','history.totalListenTimer','Track Total Listen Time',s.history.totalListenTimer,()=>toggle('history.totalListenTimer','Track Total Listen Time',s.history.totalListenTimer));
    add('History','history.saveSessions','Save Listening Sessions',s.history.saveSessions,()=>toggle('history.saveSessions','Save Listening Sessions',s.history.saveSessions));
    add('Lyrics','lyrics.enabled','Lyrics',s.lyrics.enabled,()=>toggle('lyrics.enabled','Lyrics',s.lyrics.enabled));
    add('Lyrics','lyrics.autoFetch','Auto Fetch Lyrics',s.lyrics.autoFetch,()=>toggle('lyrics.autoFetch','Auto Fetch Lyrics',s.lyrics.autoFetch));
    add('Lyrics','lyrics.preferredFormat','Preferred Format',s.lyrics.preferredFormat,()=>select('lyrics.preferredFormat','Preferred Format',s.lyrics.preferredFormat,[['auto','Auto'],['lrc','LRC'],['ttml','TTML'],['text','Text']]));
    add('Lyrics','lyrics.ignoreEmbeddedPrefix','Ignore Embedded Prefix',s.lyrics.ignoreEmbeddedPrefix,()=>text('lyrics.ignoreEmbeddedPrefix','Ignore Embedded Prefix',s.lyrics.ignoreEmbeddedPrefix));
    add('Lyrics','lyrics.fontSize','Lyrics Font Size',s.lyrics.fontSize,()=>number('lyrics.fontSize','Lyrics Font Size',s.lyrics.fontSize,10,40,1));
    add('Lyrics','lyrics.alignCenter','Center Lyrics',s.lyrics.alignCenter,()=>toggle('lyrics.alignCenter','Center Lyrics',s.lyrics.alignCenter));
    add('Lyrics','lyrics.highlightCurrentLine','Highlight Current Line',s.lyrics.highlightCurrentLine,()=>toggle('lyrics.highlightCurrentLine','Highlight Current Line',s.lyrics.highlightCurrentLine));
    add('Data','folders.showHidden','Show Hidden Files',s.folders.showHidden,()=>toggle('folders.showHidden','Show Hidden Files',s.folders.showHidden));
    add('Data','folders.scanDepth','Scan Depth',s.folders.scanDepth,()=>number('folders.scanDepth','Scan Depth',s.folders.scanDepth,0,20,1));
    const titleFor=id=>cats.find(c=>c[0]===id)?.[1]||'Settings';
    const back=section?`<button class="icon-btn settings-back" onclick="UI.navigate('settings')" aria-label="Back">${appIcon('previous')}</button>`:'';
    let html=`<div class="view-toolbar settings-toolbar"><div class="view-toolbar-left">${back}<div><h2 class="settings-title">${Utils.escapeHtml(section?titleFor(section):'Settings')}</h2><p class="settings-kicker">${section?'Preferences':'Choose a category'}</p></div></div><div class="settings-search-wrap">${appIcon('search')}<input id="settings-search" type="search" value="${Utils.escapeHtml(this.currentPageParams?.q||'')}" placeholder="Search settings…" oninput="UI.handleSettingsSearch(this.value)" autocomplete="off"></div></div>`;
    const cards=cats.map(([id,title,icon,desc])=>`<button class="settings-category-card" type="button" onclick="UI.navigate('settings',{section:'${id}'})"><span class="settings-category-icon">${appIcon(icon)}</span><span class="settings-category-copy"><strong>${Utils.escapeHtml(title)}</strong><small>${Utils.escapeHtml(desc)}</small></span><span class="settings-category-arrow">${appIcon('next')}</span></button>`).join('');
    this._settingsDefs = defs;
    html += `<div id="settings-search-live" class="settings-search-live" hidden></div>`;
    if (!section) html+=`<div class="settings-category-list settings-browse-content">${cards}</div>`;
    else if (section==='data') html+=`<div class="settings-list settings-browse-content">${defs.filter(d=>d.group==='Data').map(d=>d.render()).join('')}<div class="settings-subgroup settings-actions"><div class="settings-action-grid"><button class="btn-gold btn-full" onclick="SettingsManager.save();UI.showToast('Settings saved.')">Save Settings</button><button class="btn-outline btn-full" onclick="SettingsManager.reset();UI.showToast('Settings reset.')">Reset All Settings</button><button class="btn-outline danger btn-full" onclick="UI.clearLibrary()">Clear Library</button></div></div></div>`;
    else { const groups=section==='ui'?['UI · Library UI','UI · Music Player UI']:[titleFor(section)]; html+=`<div class="settings-list settings-browse-content">${groups.map(g=>{const items=defs.filter(d=>d.group===g);return items.length?`<div class="settings-subgroup"><h3>${Utils.escapeHtml(g.replace('UI · ',''))}</h3>${items.map(d=>d.render()).join('')}</div>`:''}).join('')}</div>`; }
    container.innerHTML=html;
    if (query) this.handleSettingsSearch(query);
  },

  handleSettingsSearch(query) {
    const q = String(query || '').trim().toLowerCase();
    const live = document.getElementById('settings-search-live');
    const browse = document.querySelectorAll('.settings-browse-content');
    if (!live) return;
    if (!q) {
      live.hidden = true;
      live.innerHTML = '';
      browse.forEach(el => el.hidden = false);
      return;
    }
    const defs = this._settingsDefs || [];
    const matches = defs.filter(d => (d.label+' '+d.path+' '+d.group+' '+d.keywords).toLowerCase().includes(q));
    live.hidden = false;
    browse.forEach(el => el.hidden = true);
    live.innerHTML = `<div class="settings-search-heading">${matches.length} setting${matches.length===1?'':'s'} found</div>${matches.length ? `<div class="settings-search-list">${matches.map(d=>d.render()).join('')}</div>` : `<div class="settings-empty">No settings match “${Utils.escapeHtml(q)}”.</div>`}`;
  },

  async renderAlbumDetail(container, params) {
    const albums = await Data.getAll('albums');
    const album = [...albums].find(a => a.id === params.albumId);
    if (!album) { this.navigate('albums'); return; }

    const tracks = await this.getTracksByAlbum(album);
    let html = '<div class="album-detail-header">';
    html += `<div class="album-detail-art">${this.getAlbumArtwork(album, tracks)}</div>`;
    html += `<div class="album-detail-info">`;
    html += `<div class="album-detail-label">Album</div>`;
    html += `<div class="album-detail-title">${Utils.escapeHtml(album.name)}</div>`;
    html += `<div class="album-detail-meta">${Utils.escapeHtml(album.artist || 'Unknown Artist')} &bull; ${tracks.length} tracks</div>`;
    html += `<div class="album-detail-actions">`;
    html += `<button class="btn-gold" onclick="UI.playTracksByIds([${tracks.map(t => `'${t.id}'`).join(',')}], 0)">Play</button>`;
    html += `<button class="btn-outline" onclick="UI.shuffleAlbum('${album.id}')">Shuffle</button>`;
    html += `</div></div></div>`;

    if (tracks.length > 0) {
      html += '<div class="track-list">';
      tracks.forEach((track, i) => {
        html += this.renderTrackRow(track, i + 1);
      });
      html += '</div>';
    }
    container.innerHTML = html;
  },

  async renderArtistDetail(container, params) {
    const artistName = String(params?.artist || '').trim();
    if (!artistName) { this.navigate('artists'); return; }
    const artistRecords = await Data.getAll('artists');
    const artistRecord = [...artistRecords].find(a => String(a.name || '').trim().toLowerCase() === artistName.toLowerCase());
    const tracks = await this.getTracksByArtist({ name: artistName });
    const representative = this.getRepresentativeTrack(tracks);
    const artwork = representative ? this.getArtworkUrl(representative) : (artistRecord?._artwork || 'assets/default-art.png');
    const albums = [...new Set(tracks.map(t => t.album).filter(Boolean))].sort((a,b)=>String(a).localeCompare(String(b),undefined,{numeric:true,sensitivity:'base'}));

    let html = '<div class="album-detail-header artist-detail-header">';
    html += `<div class="album-detail-art circle">${`<img src="${Utils.escapeHtml(artwork)}" alt="">`}</div>`;
    html += `<div class="album-detail-info">`;
    html += `<div class="album-detail-label">Artist</div>`;
    html += `<div class="album-detail-title">${Utils.escapeHtml(artistName)}</div>`;
    html += `<div class="album-detail-meta">${tracks.length} tracks · ${albums.length} albums</div>`;
    html += `<div class="album-detail-actions">`;
    if (tracks.length) {
      const encodedIds = encodeURIComponent(JSON.stringify(tracks.map(t => t.id)));
      const encodedArtist = encodeURIComponent(artistName);
      html += `<button class="btn-gold" data-track-ids="${encodedIds}" onclick="UI.playEncodedIds(this.dataset.trackIds,0)">Play</button>`;
      html += `<button class="btn-outline" data-artist="${encodedArtist}" onclick="UI.shuffleArtistEncoded(this.dataset.artist)">Shuffle</button>`;
    }
    html += `</div></div></div>`;

    if (tracks.length > 0) {
      html += '<div class="section-header"><h2>Tracks</h2></div><div class="track-list">';
      tracks.forEach((track, i) => { html += this.renderTrackRow(track, i + 1); });
      html += '</div>';
    } else {
      html += this.renderEmptyState('No tracks found for this artist');
    }
    container.innerHTML = html;
  },

  async renderGenreDetail(container, params) {
    const genreName = params.genre;
    const tracks = await this.getTracksByGenre({ name: genreName });
    let html = '<div class="album-detail-header">';
    html += `<div class="album-detail-art" style="background:linear-gradient(135deg, rgba(var(--accent-rgb),0.3), var(--bg-elevated));display:flex;align-items:center;justify-content:center;"><span class="genre-icon">${genreName[0]}</span></div>`;
    html += `<div class="album-detail-info">`;
    html += `<div class="album-detail-label">Genre</div>`;
    html += `<div class="album-detail-title">${Utils.escapeHtml(genreName)}</div>`;
    html += `<div class="album-detail-meta">${tracks.length} tracks</div>`;
    html += `<div class="album-detail-actions">`;
    html += `<button class="btn-gold" onclick="UI.playTracksByIds([${tracks.map(t => `'${t.id}'`).join(',')}], 0)">Play</button>`;
    html += `</div></div></div>`;

    if (tracks.length > 0) {
      html += '<div class="track-list">';
      tracks.forEach((track, i) => {
        html += this.renderTrackRow(track, i + 1);
      });
      html += '</div>';
    }
    container.innerHTML = html;
  },

  async playTrackById(id) {
    const track = await Data.getTrack(id);
    if (!track) return;

    // A track-row click used to load the track directly, leaving the player
    // queue unchanged (often empty or pointing at an old queue). That made
    // Previous/Next appear to do nothing. Preserve an existing queue when it
    // contains this track; otherwise build a library queue around the clicked
    // track so transport controls always have real context.
    const existingQueue = Array.isArray(Player.queue) ? Player.queue : [];
    const existingIndex = existingQueue.findIndex(t => t && t.id === track.id);

    if (existingIndex >= 0) {
      Player.queueIndex = existingIndex;
      await Player.loadTrack(track);
      return;
    }

    const allTracks = await Data.getTracks();
    const libraryQueue = Array.isArray(allTracks) ? allTracks.filter(Boolean) : [];
    const startIndex = libraryQueue.findIndex(t => t && t.id === track.id);

    if (startIndex >= 0 && libraryQueue.length > 1) {
      Player.setQueue(libraryQueue, startIndex);
    } else {
      Player.setQueue([track], 0);
    }

    await Player.loadTrack(track);
  },

  async playTracksByIds(ids, startIndex = 0) {
    const tracks = (await Promise.all(ids.map(id => Data.getTrack(id)))).filter(Boolean);
    if (tracks.length === 0) return;
    Player.setQueue(tracks, startIndex);
    Player.loadTrack(tracks[startIndex]);
  },

  renderTrackRow(track, index) {
    const isPlaying = Player.currentTrack && Player.currentTrack.id === track.id;
    const isSelected = this.selectedTracks.has(track.id);
    return `
      <div class="track-row ${isPlaying ? 'playing' : ''} ${isSelected ? 'selected' : ''}" data-track-id="${Utils.escapeHtml(String(track.id))}" onclick="${this.isSelectionMode ? `UI.toggleTrackSelection('${track.id}')` : `UI.playTrackById('${track.id}')`}" oncontextmenu="UI.showTrackMenu('${track.id}', event)">
        ${this.isSelectionMode ? `<div class="track-check ${isSelected ? 'checked' : ''}">${appIcon('select')}</div>` : ''}
        <img class="track-art" src="${this.getArtworkUrl(track)}" alt="">
        <div class="track-info">
          <span class="track-title">${Utils.escapeHtml(track.title)}</span>
          <span class="track-meta">${Utils.escapeHtml(track.artist)}${track.album ? ' &bull; ' + Utils.escapeHtml(track.album) : ''}</span>
        </div>
        <div class="track-actions">
          <button class="icon-btn small track-favorite-btn ${track.favorite ? 'is-favorite' : ''}" onclick="event.stopPropagation(); UI.toggleTrackFavorite('${track.id}')">
            ${appIcon('favourite')}
          </button>
          <button class="icon-btn small" onclick="event.stopPropagation(); UI.showTrackMenu('${track.id}', event)">
            ${appIcon('options')}
          </button>
        </div>
      </div>
    `;
  },

  renderAlbumCard(item, size = 'normal') {
    const art = item.artwork || item._artwork || (item.tracks && item.tracks[0] && typeof item.tracks[0] === 'object' ? this.getArtworkUrl(item.tracks[0]) : 'assets/default-art.png');
    const title = item.title || item.name || 'Unknown';
    const subtitle = item.artist || item.subtitle || (item.tracks ? `${item.tracks.length} tracks` : '');
    return `
      <div class="grid-art">
        <img src="${art}" alt="" loading="lazy">
        <div class="grid-overlay">
          <button class="play-overlay" onclick="event.stopPropagation(); ${item.id ? `UI.playTrackById('${item.id}')` : ''}">
            ${appIcon('play')}
          </button>
        </div>
      </div>
      <span class="grid-title">${Utils.escapeHtml(title)}</span>
      <span class="grid-subtitle">${Utils.escapeHtml(subtitle)}</span>
    `;
  },

  renderArtistCard(artist) {
    return `
      <div class="grid-art circle">
        <img src="${artist._artwork || 'assets/default-art.png'}" alt="" loading="lazy">
        <div class="grid-overlay">
          <button class="play-overlay" onclick="event.stopPropagation(); UI.openArtist(this.closest('.collection-card-item')?.dataset.artistName || '')">
            ${appIcon('play')}
          </button>
        </div>
      </div>
      <span class="grid-title">${Utils.escapeHtml(artist.name)}</span>
      <span class="grid-subtitle">${artist.tracks?.length || artist.trackCount || 0} tracks</span>
    `;
  },

  renderGenreCard(genre) {
    return `
      <div class="grid-art gradient">
        <span class="genre-icon">${genre.name[0]}</span>
      </div>
      <span class="grid-title">${Utils.escapeHtml(genre.name)}</span>
      <span class="grid-subtitle">${genre.trackCount || 0} tracks</span>
    `;
  },

  renderPlaylistCard(pl) {
    return `
      <div class="playlist-card" onclick="UI.navigate('playlist-detail', {playlistId: '${pl.id}'})">
        <div class="playlist-art">${this.getPlaylistArtwork(pl)}</div>
        <div class="playlist-info">
          <span class="playlist-name">${Utils.escapeHtml(pl.name)}</span>
          <span class="playlist-count">${pl.tracks.length} tracks &bull; ${pl.type === 'auto' ? 'Smart' : 'User'}</span>
        </div>
      </div>
    `;
  },

  renderEmptyState(message) {
    return `<div class="empty-state"><p>${message}</p></div>`;
  },

  updateMiniPlayer() {
    // Handled by onTrackChanged
  },

  updateFullPlayer() {
    // Handled by onTrackChanged and onTimeUpdate
  },


  openFullPlayer() {
    document.body.classList.add('full-player-open');
    document.getElementById('full-player').classList.add('open');
    this.applyFillAlbumArtMode();
    this.applyWaveformMode();
  },

  closeFullPlayer() {
    document.getElementById('full-player').classList.remove('open');
    document.body.classList.remove('full-player-open');
    this.hidePlayerOptions();
    this.closePlayerOverlay('lyrics');
    this.closePlayerOverlay('audio-effects');
    if (this.lyricsInterval) {
      clearInterval(this.lyricsInterval);
      this.lyricsInterval = null;
    }
  },

  toggleFavorite() {
    const track = Player.currentTrack;
    if (!track) return;
    track.favorite = !track.favorite;
    Data.saveTrack(track);
    document.getElementById('fp-favorite').classList.toggle('active', track.favorite);
  },

  async toggleTrackFavorite(id) {
    const track = await Data.getTrack(id);
    if (!track) return;
    track.favorite = !track.favorite;
    await Data.saveTrack(track);
    this.renderCurrentPage();
  },

  toggleRepeat() {
    const current = SettingsManager.get('playback.repeatMode');
    const next = current === 'none' ? 'all' : current === 'all' ? 'one' : current === 'one' ? 'n' : 'none';
    Player.repeatCount = 0;
    SettingsManager.set('playback.repeatMode', next);
    this.updatePlayerControls();
  },

  handleRepeatButton() {
    const current = SettingsManager.get('playback.repeatMode', 'none');
    if (current === 'n') return this.configureRepeatNTimes();
    this.toggleRepeat();
  },

  configureRepeatNTimes() {
    const current = Math.max(1, Math.min(20, Number(SettingsManager.get('playback.repeatNTimes', 2)) || 2));
    const raw = prompt('Repeat this song how many times? (1–20)', String(current));
    if (raw === null) return;
    const value = Math.floor(Number(raw));
    if (!Number.isFinite(value) || value < 1 || value > 20) {
      this.showToast('Choose a repeat count from 1 to 20.');
      return;
    }
    Player.repeatCount = 0;
    SettingsManager.set('playback.repeatNTimes', value);
    SettingsManager.set('playback.repeatMode', 'n');
    this.updatePlayerControls();
  },

  toggleShuffle() {
    const current = SettingsManager.get('playback.shuffleMode');
    SettingsManager.set('playback.shuffleMode', !current);
    this.updatePlayerControls();
  },

  showPlaylistModal() {
    const modal = document.getElementById('playlist-modal');
    const list = document.getElementById('playlist-modal-list');
    Data.getPlaylists().then(playlists => {
      const userPls = playlists.filter(p => p.type === 'user');
      list.innerHTML = userPls.map(p => `
        <div class="modal-item" onclick="UI.addToPlaylist('${p.id}')">${Utils.escapeHtml(p.name)}</div>
      `).join('');
      modal.classList.add('open');
    });
  },

  hidePlaylistModal() {
    document.getElementById('playlist-modal').classList.remove('open');
  },

  async addToPlaylist(playlistId, trackId) {
    const pl = await Data.getPlaylist(playlistId);
    if (!pl) return;
    const targetId = trackId || (this.trackMenuTargetId);
    if (targetId && !pl.tracks.includes(targetId)) {
      pl.tracks.push(targetId);
      await Data.updatePlaylist(pl);
    } else if (!targetId && this.isSelectionMode) {
      this.selectedTracks.forEach(id => {
        if (!pl.tracks.includes(id)) pl.tracks.push(id);
      });
      await Data.updatePlaylist(pl);
      this.clearSelection();
    }
    this.hidePlaylistModal();
    this.hideTrackMenu();
  },

  async createPlaylist() {
    const name = prompt('Playlist name:');
    if (!name) return;
    const pl = {
      id: Utils.generateId(),
      name: name.trim(),
      type: 'user',
      tracks: [],
      created: Date.now()
    };
    await Data.savePlaylist(pl);
    this.renderSidebarPlaylists();
    this.renderCurrentPage();
    this.hidePlaylistModal();
  },

  async deletePlaylist(id) {
    if (!confirm('Delete this playlist?')) return;
    await Data.deletePlaylist(id);
    this.renderSidebarPlaylists();
    this.navigate('playlists');
  },

  async saveQueueAsPlaylist() {
    const name = prompt('Playlist name:');
    if (!name) return;
    const pl = {
      id: Utils.generateId(),
      name: name.trim(),
      type: 'user',
      tracks: Player.queue.map(t => t.id),
      created: Date.now()
    };
    await Data.savePlaylist(pl);
    this.renderSidebarPlaylists();
  },

  async exportPlaylistM3U(playlistId) {
    const pl = await Data.getPlaylist(playlistId);
    if (!pl) return;
    const tracks = await this.getTracksByPlaylist(pl);
    const m3u = Utils.generateM3U(tracks, pl.name);
    Utils.downloadFile(m3u, pl.name + '.m3u');
  },

  async importM3U() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.m3u,.m3u8';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const text = await file.text();
      const tracks = Utils.parseM3U(text, '');
      const pl = {
        id: Utils.generateId(),
        name: file.name.replace(/\.m3u8?$/i, ''),
        type: 'user',
        tracks: tracks.map(t => t.path),
        created: Date.now()
      };
      await Data.savePlaylist(pl);
      this.renderSidebarPlaylists();
      this.renderCurrentPage();
    };
    input.click();
  },

  async scanMusic() {
    if (!window.showDirectoryPicker) {
      console.warn('File System Access API not supported');
      return;
    }
    try {
      const dirHandle = await window.showDirectoryPicker();
      try {
        await Data.saveFolder({ path: dirHandle.name, name: dirHandle.name, handle: dirHandle, lastScanned: Date.now() });
      } catch (saveError) {
        console.warn('Could not remember folder handle:', saveError);
      }
      await Scanner.scanDirectory(dirHandle);
    } catch(e) {
      console.warn('Scan cancelled or failed:', e.message);
    }
  },

  async autoIndexSavedFolders() {
    if (!SettingsManager.get('library.autoIndexOnLaunch')) return;
    if (!window.showDirectoryPicker) return;

    const folders = await Data.getFolders();
    if (!folders.length) return;

    for (const folder of folders) {
      const handle = folder.handle;
      if (!handle || typeof handle.queryPermission !== 'function') continue;
      try {
        const permission = await handle.queryPermission({ mode: 'read' });
        if (permission === 'granted') {
          await Scanner.scanDirectory(handle);
          try {
            await Data.saveFolder({ ...folder, lastScanned: Date.now() });
          } catch(e) {}
        }
      } catch(e) {
        console.warn('Auto index skipped for folder:', folder.name || folder.path, e);
      }
    }
  },

  startSleepTimer() {
    const mode = SettingsManager.get('playback.sleepTimer.mode');
    const value = SettingsManager.get('playback.sleepTimer.value');
    Player.setSleepTimer(mode, value);
  },

  stopSleepTimer() {
    Player.stopSleepTimer();
  },

  showToast(message) {
    console.log('[Okvy]', message);
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 2200);
  },

  async clearLibrary() {
    try {
      await Data.clearLibrary();
      Player.setQueue([], 0);
      this.showToast('Library cleared.');
      this.renderSidebarPlaylists();
      this.renderCurrentPage();
    } catch (error) {
      console.error('Could not clear library:', error);
      this.showToast('Could not clear the library.');
    }
  },

  showTrackMenu(id, event) {
    if (event) event.stopPropagation();
    this.trackMenuTargetId = id;
    const menuItems = [
      { icon: 'playAfterTracks', label: 'Play Next', action: () => this.playTrackNext(id) },
      { icon: 'addPlayNext', label: 'Add to Queue', action: () => this.addTrackToQueue(id) },
      { icon: 'addPlaylist', label: 'Add to Playlist', action: () => this.showPlaylistModalForTrack(id) },
      { icon: 'playOnly', label: 'Play Only This Track', action: () => this.playOnlyTrack(id) },
      { icon: 'favourite', label: 'Add / Remove Favorite', action: () => this.toggleTrackFavorite(id) },
      { icon: 'favoriteArtist', label: 'Favorite Artist', action: () => this.toggleFavoriteArtist(id) },
      { icon: 'metadata', label: 'Edit Metadata', action: () => this.editTrackMetadata(id) },
      { icon: 'youtube', label: 'Find on YouTube', action: () => this.findTrackOnYouTube(id) },
      { icon: 'share', label: 'Share', action: () => this.shareTrackById(id) },
      { icon: 'albums', label: 'Go to Album', action: () => this.goToAlbum(id) },
      { icon: 'artists', label: 'Go to Artist', action: () => this.goToArtist(id) },
      { icon: 'delete', label: 'Delete Track from Library', action: () => this.deleteTrack(id) },
      { icon: 'deleteArtist', label: 'Delete Artist & Related Tracks', action: () => this.deleteArtistAndTracks(id) },
    ];
    const container = document.getElementById('track-menu-list');
    container.innerHTML = menuItems.map((item, i) =>
      `<div class="modal-item menu-action-item" onclick="UI.trackMenuAction(${i})">${item.icon ? appIcon(item.icon) : ''}<span>${Utils.escapeHtml(item.label)}</span></div>`
    ).join('');
    this.trackMenuActions = menuItems;
    document.getElementById('track-menu-modal').classList.add('open');
  },

  trackMenuAction(index) {
    if (this.trackMenuActions && this.trackMenuActions[index]) {
      this.trackMenuActions[index].action();
    }
    this.hideTrackMenu();
  },

  async playOnlyTrack(id) {
    const track = await Data.getTrack(id);
    if (track) Player.setQueue([track], 0);
  },

  async toggleFavoriteArtist(id) {
    const track = await Data.getTrack(id);
    if (!track?.artist) return;
    const list = JSON.parse(localStorage.getItem('okvy_favorite_artists') || '[]');
    const next = list.includes(track.artist) ? list.filter(a => a !== track.artist) : [...list, track.artist];
    localStorage.setItem('okvy_favorite_artists', JSON.stringify(next));
    this.showToast(next.includes(track.artist) ? `Favorite artist: ${track.artist}` : `Removed favorite artist: ${track.artist}`);
  },

  async editTrackMetadata(id) {
    const track = await Data.getTrack(id);
    if (!track) return;
    const title = prompt('Title', track.title || '');
    if (title === null) return;
    const artist = prompt('Artist', track.artist || '');
    if (artist === null) return;
    const album = prompt('Album', track.album || '');
    if (album === null) return;
    await Data.saveTrack({ ...track, title: title.trim() || track.title, artist: artist.trim() || track.artist, album: album.trim() || track.album });
    this.renderCurrentPage();
    this.showToast('Metadata updated.');
  },

  async findTrackOnYouTube(id) {
    const track = await Data.getTrack(id);
    if (!track) return;
    const q = encodeURIComponent(`${track.title || ''} ${track.artist || ''}`.trim());
    window.open(`https://www.youtube.com/results?search_query=${q}`, '_blank', 'noopener');
  },


  async deleteArtistAndTracks(id) {
    const track = await Data.getTrack(id);
    if (!track?.artist) return;
    const all = await Data.getTracks();
    const related = all.filter(t => t.artist === track.artist);
    if (!confirm(`Delete artist “${track.artist}” and all ${related.length} related tracks from the library?`)) return;
    for (const t of related) await Data.deleteTrack(t.id);
    if (related.some(t => t.id === Player.currentTrack?.id)) await Player.pause();
    Player.queue = Player.queue.filter(t => !related.some(r => r.id === t.id));
    this.renderCurrentPage();
    this.showToast(`Deleted ${related.length} track${related.length === 1 ? '' : 's'} by ${track.artist}.`);
  },

  async deleteTrack(id) {
    const track = await Data.getTrack(id);
    if (!track) return;
    if (!confirm(`Remove “${track.title || 'this track'}” from the library?`)) return;
    await Data.deleteTrack(id);
    if (Player.currentTrack?.id === id) await Player.pause();
    Player.queue = Player.queue.filter(t => t.id !== id);
    this.renderCurrentPage();
    this.showToast('Track removed from library.');
  },

  closePlayerOverlay(kind) {
    const id = kind === 'lyrics' ? 'lyrics-overlay' : 'audio-effects-overlay';
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open', 'expanded');
    el.setAttribute('aria-hidden', 'true');
    if (kind === 'lyrics' && this.lyricsOverlayInterval) {
      clearInterval(this.lyricsOverlayInterval);
      this.lyricsOverlayInterval = null;
    }
  },

  bindLyricsLongPress() {
    const card = document.getElementById('lyrics-overlay-card');
    if (!card) return;
    let timer = null;
    let active = false;
    const start = (e) => {
      if (e.target.closest('.overlay-close')) return;
      active = true;
      timer = setTimeout(() => {
        if (!active) return;
        card.classList.add('expanded');
        const overlay = document.getElementById('lyrics-overlay');
        overlay?.classList.add('expanded');
      }, 520);
    };
    const cancel = () => { active = false; if (timer) { clearTimeout(timer); timer = null; } };
    card.addEventListener('pointerdown', start);
    ['pointerup','pointercancel','pointerleave'].forEach(type => card.addEventListener(type, cancel));
  },

  async openLyricsOverlay(expand = false) {
    const track = Player.currentTrack;
    if (!track) { this.showToast('Nothing is playing.'); return; }
    const overlay = document.getElementById('lyrics-overlay');
    const linesEl = document.getElementById('lyrics-preview-lines');
    if (!overlay || !linesEl) return;
    const art = this.getArtworkUrl(track);
    overlay.style.setProperty('--lyrics-art', `url("${String(art).replace(/"/g, '\\"')}")`);
    document.getElementById('lyrics-overlay-title').textContent = track.title || 'Lyrics';
    document.getElementById('lyrics-overlay-artist').textContent = track.artist || '-';
    const lyrics = track.lyrics ? track.lyrics : track.lyricsLrc ? Utils.lrcParse(track.lyricsLrc) : track.lyricsTtml ? Utils.ttmlParse(track.lyricsTtml) : null;
    if (!SettingsManager.get('lyrics.enabled')) {
      linesEl.innerHTML = `<div class="lyrics-empty">Lyrics are disabled in Settings.</div>`;
    } else if (!lyrics?.length) {
      linesEl.innerHTML = `<div class="lyrics-empty">No lyrics available.</div><button class="btn-outline" onclick="UI.closePlayerOverlay('lyrics'); UI.renderLyricsEditor(document.getElementById('page-container'))">Add Lyrics</button>`;
    } else {
      const size = SettingsManager.get('lyrics.fontSize', 16);
      linesEl.innerHTML = lyrics.map((line,i) => `<div class="lyric-preview-line" id="overlay-lyric-${i}" data-time="${line.time}" style="font-size:${size}px">${Utils.escapeHtml(line.text)}</div>`).join('');
      this.lyricsOverlayInterval = setInterval(() => this.highlightOverlayLyric(lyrics), 180);
      this.highlightOverlayLyric(lyrics);
    }
    overlay.classList.add('open');
    if (expand) { overlay.classList.add('expanded'); document.getElementById('lyrics-overlay-card')?.classList.add('expanded'); }
    overlay.setAttribute('aria-hidden','false');
  },

  highlightOverlayLyric(lyrics) {
    const current = Player.getCurrentTime();
    let active = -1;
    for (let i=0;i<lyrics.length;i++) if (lyrics[i].time <= current) active=i;
    document.querySelectorAll('.lyric-preview-line').forEach((el,i)=>el.classList.toggle('active',i===active));
    const line = active >= 0 ? document.getElementById(`overlay-lyric-${active}`) : null;
    if (line && document.getElementById('lyrics-overlay-card')?.classList.contains('expanded')) line.scrollIntoView({behavior:'smooth',block:'center'});
  },

  async openAudioEffectsOverlay() {
    const overlay = document.getElementById('audio-effects-overlay');
    const content = document.getElementById('audio-effects-overlay-content');
    if (!overlay || !content) return;
    content.innerHTML = this.buildAudioEffectsControls();
    content.querySelectorAll('input[type="range"]').forEach(input => this.updateRangeProgress(input));
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
  },

  buildAudioEffectsControls() {
    const presets = SettingsManager.get('audio.eqPresets', CONFIG.audio.eqPresets || []);
    const preset = SettingsManager.get('audio.eqCurrentPreset','Flat');
    const bands = [60,250,1000,4000,16000];
    const presetValues = presets.find(p => p.name === preset)?.values;
    const values = preset === 'Custom'
      ? (Array.isArray(SettingsManager.get('audio.eqCustomValues', [])) ? SettingsManager.get('audio.eqCustomValues', Array(5).fill(0)) : Array(5).fill(0))
      : (presetValues || Array(5).fill(0));
    const eqEnabled = SettingsManager.get('audio.equalizerEnabled', true);
    const pitch = Number(SettingsManager.get('audio.pitchSemitones',0));
    const speed = Number(SettingsManager.get('audio.playbackSpeed',1));
    const boost = Number(SettingsManager.get('audio.volumeBoost',1));
    const boostEnabled = !!SettingsManager.get('audio.volumeBoostEnabled', false);
    return `<div class="effects-modern-page effects-overlay-modern-page">
      <section class="effects-modern-section effects-modern-eq">
        <div class="effects-modern-head"><div><span class="effects-modern-overline">EQUALIZER</span><h3>5-band EQ</h3></div><label class="switch-modern"><input type="checkbox" ${eqEnabled ? 'checked' : ''} onchange="SettingsManager.set('audio.equalizerEnabled', this.checked)"><span></span></label></div>
        <div class="effects-modern-toolbar"><label class="effects-modern-select"><span>Preset</span><select onchange="UI.setEqPreset(this.value)">${presets.map(p=>`<option value="${Utils.escapeHtml(p.name)}" ${p.name===preset?'selected':''}>${Utils.escapeHtml(p.name)}</option>`).join('')}<option value="Custom" ${preset==='Custom'?'selected':''}>Custom</option></select></label><button class="effects-modern-action" type="button" onclick="UI.resetEqualizer()">Reset</button></div>
        <div class="eq-modern-grid">${bands.map((f,i)=>{const v=Number(values[i]||0);return `<div class="eq-modern-band"><div class="eq-modern-value" id="overlay-eq-value-${i}">${v>0?'+':''}${v} dB</div><div class="eq-modern-track"><span class="eq-modern-rail"></span><span class="eq-modern-fill"></span><span class="eq-modern-zero"></span><span class="eq-modern-knob"></span><input class="eq-modern-input" aria-label="${f} Hz EQ" type="range" min="-12" max="12" step="0.5" value="${v}" oninput="UI.setQuickEQ(${i}, this.value); UI.updateEqVisual(this, ${i}, 'overlay-')"></div><div class="eq-modern-frequency">${f>=1000?`${f/1000}k`:f}<span>Hz</span></div></div>`;}).join('')}</div>
        <div class="eq-modern-scale"><span>-12 dB</span><span>0</span><span>+12 dB</span></div>
      </section>
      <section class="effects-modern-section"><div class="effects-modern-head"><div><span class="effects-modern-overline">PLAYBACK</span><h3>Pitch</h3><p>Independent pitch shift.</p></div>${appIcon('pitchSpeed')}</div><div class="modern-range-block"><div class="modern-range-value-row"><span>Pitch</span><strong id="overlay-pitch-value">${pitch>0?'+':''}${pitch} st</strong></div><input class="modern-range" id="overlay-pitch-range" type="range" min="-6" max="6" step="1" value="${Math.max(-6,Math.min(6,Math.round(pitch)))}" oninput="UI.setPitch(this.value,this)"><div class="modern-range-scale"><span>-6 st</span><span>Neutral</span><span>+6 st</span></div></div><button class="modern-inline-reset" type="button" onclick="UI.resetPitch()">Reset Pitch</button></section>
      <section class="effects-modern-section"><div class="effects-modern-head"><div><span class="effects-modern-overline">PLAYBACK</span><h3>Speed</h3><p>Independent playback speed.</p></div>${appIcon('playAfterSeconds')}</div><div class="modern-range-block"><div class="modern-range-value-row"><span>Speed</span><strong id="overlay-speed-value">${speed.toFixed(2)}×</strong></div><input class="modern-range" id="overlay-speed-range" type="range" min="0.5" max="2" step="0.05" value="${speed.toFixed(2)}" oninput="UI.setSpeed(this.value,this)"><div class="modern-range-scale"><span>0.50×</span><span>1.00×</span><span>2.00×</span></div></div><button class="modern-inline-reset" type="button" onclick="UI.resetSpeed()">Reset Speed</button></section>
      <section class="effects-modern-section"><div class="effects-modern-head"><div><span class="effects-modern-overline">OUTPUT</span><h3>Volume Boost</h3><p>Additional playback gain</p></div><label class="switch-modern" title="Enable volume boost"><input type="checkbox" ${boostEnabled ? 'checked' : ''} onchange="SettingsManager.set('audio.volumeBoostEnabled', this.checked)"><span></span></label></div><div class="modern-range-block"><div class="modern-range-value-row"><span>Boost</span><strong id="overlay-boost-value">${Math.round(boost*100)}%</strong></div><input class="modern-range volume-boost-drag" id="overlay-volume-boost-range" type="range" min="0.5" max="2.5" step="0.05" value="${boost}" ${boostEnabled ? '' : 'disabled'} oninput="UI.setEffectValue('volumeBoost',this.value,this)" aria-label="Volume Boost"><div class="modern-range-scale"><span>50%</span><span>100%</span><span>250%</span></div></div><button class="modern-inline-reset" type="button" onclick="UI.resetVolumeBoost()">Reset Boost</button></section>
    </div>`;
  },

  setQuickEQ(index, value) {
    const vals = [...SettingsManager.get('audio.eqCustomValues', Array(5).fill(0))];
    vals[index] = Number(value)||0;
    SettingsManager.set('audio.eqCustomValues', vals);
    SettingsManager.set('audio.eqCurrentPreset', 'Custom', {notify:false});
    Player.applyEQPreset();
  },

  setEqBand(index, value) {
    const vals = [...SettingsManager.get('audio.eqCustomValues', Array(5).fill(0))];
    vals[index] = Number(value) || 0;
    SettingsManager.set('audio.eqCustomValues', vals);
    SettingsManager.set('audio.eqCurrentPreset', 'Custom', {notify:false});
    Player.setEQBand(index, Number(value));
    const v = Number(value) || 0;
    const el = document.getElementById(`eq-value-${index}`);
    if (el) el.textContent = `${v>0?'+':''}${v} dB`;
  },

  showPlayerOptions() {
    if (!Player.currentTrack) { this.showToast('Nothing is playing.'); return; }
    const activeSleep = Player.sleepTimer || Player.sleepTracksRemaining > 0;
    const items = [
      { icon: 'equalizer', label: 'Audio Effects', action: () => { this.hidePlayerOptions(); this.openAudioEffectsOverlay(); } },
      { icon: SettingsManager.get('ui.themeMode') === 'light' ? 'darkMode' : 'lightMode', label: SettingsManager.get('ui.themeMode') === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme', action: () => { const next = SettingsManager.get('ui.themeMode') === 'light' ? 'dark' : 'light'; SettingsManager.set('ui.themeMode', next); this.showPlayerOptions(); } },
      { icon: 'repeatSection', label: Player.repeatSection.enabled ? 'Stop Repeat Section' : 'Set Repeat Section', action: () => this.toggleRepeatSection() },
      { icon: 'playAfterSeconds', label: 'Play After X Seconds', action: () => this.schedulePlayAfterPrompt() },
      { icon: 'playAfterTracks', label: 'Play After X Tracks', action: () => this.scheduleAfterTracksPrompt() },
      { icon: activeSleep ? 'pauseSleep' : 'sleepTimer', label: activeSleep ? 'Manage Sleep Timer' : 'Sleep Timer', action: () => this.showSleepTimerPrompt() },
      { icon: 'lyrics', label: 'Lyrics', action: () => { this.hidePlayerOptions(); this.openLyricsOverlay(false); } },
      { icon: 'queue', label: 'Queue', action: () => { this.hidePlayerOptions(); this.closeFullPlayer(); this.navigate('queue'); } },
      { icon: 'share', label: 'Share Track', action: () => { this.hidePlayerOptions(); this.shareTrack(); } },
    ];
    const container = document.getElementById('player-options-list');
    container.innerHTML = items.map((item,i) => `<div class="modal-item menu-action-item" onclick="UI.playerOptionAction(${i})">${appIcon(item.icon)}<span>${Utils.escapeHtml(item.label)}</span></div>`).join('');
    this.playerOptionActions = items;
    document.getElementById('player-options-modal').classList.add('open');
  },

  playerOptionAction(index) {
    const item = this.playerOptionActions?.[index];
    if (item) item.action();
  },

  hidePlayerOptions() {
    document.getElementById('player-options-modal').classList.remove('open');
    this.playerOptionActions = null;
  },

  schedulePlayAfterPrompt() {
    const seconds = Number(prompt('Start playback after how many seconds?', '10'));
    if (!Number.isFinite(seconds) || seconds < 0) return;
    this.hidePlayerOptions();
    Player.pause();
    Player.schedulePlayAfter(seconds);
    this.showToast(`Playback scheduled in ${seconds}s.`);
  },

  scheduleAfterTracksPrompt() {
    const count = Math.max(1, Math.floor(Number(prompt('Play the current track again after how many tracks?', '1')) || 0));
    if (!count) return;
    this.hidePlayerOptions();
    Player.scheduleAfterTrackCount = count;
    this.showToast(`Will repeat this track after ${count} track${count === 1 ? '' : 's'}.`);
  },

  showSleepTimerPrompt() {
    const choice = prompt('Sleep timer: enter minutes, or tracks for a track count. Example: 30 or tracks:3', '30');
    if (choice === null) return;
    if (String(choice).toLowerCase().startsWith('tracks:')) {
      const n = Math.max(1, Math.floor(Number(String(choice).split(':')[1])) || 1);
      Player.setSleepTimer('tracks', n);
      this.showToast(`Sleep timer set for ${n} track${n === 1 ? '' : 's'}.`);
    } else {
      const minutes = Math.max(1, Number(choice) || 1);
      Player.setSleepTimer('minutes', minutes);
      this.showToast(`Sleep timer set for ${minutes} minutes.`);
    }
    this.hidePlayerOptions();
  },

  toggleRepeatSection() {
    if (Player.repeatSection.enabled) {
      Player.clearRepeatSection();
      this.showToast('Repeat section off.');
    } else if (Player.repeatSection.start === null) {
      Player.setRepeatSectionStart();
      this.showToast('Repeat start marked. Play to the end point, then open Options and choose Repeat Section again.');
    } else {
      Player.setRepeatSectionEnd();
      this.showToast(Player.repeatSection.enabled ? 'Repeat section enabled.' : 'Move the end point after the start point.');
    }
    this.hidePlayerOptions();
  },

  hideTrackMenu() {
    document.getElementById('track-menu-modal').classList.remove('open');
    this.trackMenuActions = null;
    this.trackMenuTargetId = null;
  },

  async playTrackNext(id) {
    const track = await Data.getTrack(id);
    if (track) Player.addToQueue([track], 'next');
  },

  async addTrackToQueue(id) {
    const track = await Data.getTrack(id);
    if (track) Player.addToQueue([track], 'end');
  },

  async showPlaylistModalForTrack(id) {
    const track = await Data.getTrack(id);
    if (!track) return;
    const playlists = await Data.getPlaylists();
    const userPls = playlists.filter(p => p.type === 'user');
    document.getElementById('playlist-modal-list').innerHTML = userPls.map(p => `
      <div class="modal-item" onclick="UI.addToPlaylist('${p.id}', '${track.id}'); UI.hidePlaylistModal(); UI.hideTrackMenu()">${Utils.escapeHtml(p.name)}</div>
    `).join('');
    document.getElementById('playlist-modal').classList.add('open');
  },

  async goToAlbum(id) {
    const track = await Data.getTrack(id);
    if (!track || !track.album) return;
    const albums = await Data.getAll('albums');
    const album = [...albums].find(a => a.name === track.album);
    if (album) this.navigate('album-detail', { albumId: album.id });
  },

  async goToArtist(id) {
    const track = await Data.getTrack(id);
    if (track && track.artist) {
      this.navigate('tracks', { artist: track.artist });
    }
  },

  async shareTrackById(id) {
    const track = await Data.getTrack(id);
    if (!track) return;
    if (navigator.share) {
      navigator.share({ title: track.title, text: `${track.artist} - ${track.title}` });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${track.artist} - ${track.title}`);
    }
  },

  async addSelectedToQueue() {
    const tracks = await Data.getTracks();
    const selected = tracks.filter(t => this.selectedTracks.has(t.id));
    if (selected.length > 0) {
      Player.addToQueue(selected, 'end');
    }
    this.clearSelection();
  },

  toggleSortDir() {
    const select = document.querySelector('.sort-select');
    const field = select?.value || this.currentSortBy || this.currentPageParams?.sortBy || 'title';
    const currentDir = this.currentPageParams?.sortDir || this.currentSortDir || 'asc';
    const newDir = currentDir === 'asc' ? 'desc' : 'asc';
    this.currentSortBy = field;
    this.currentSortDir = newDir;
    this.navigate(this.currentPage, { ...(this.currentPageParams || {}), sortBy: field, sortDir: newDir });
  },

  applyFillAlbumArtMode() {
    const fp = document.getElementById('full-player');
    if (!fp) return;
    fp.classList.toggle('fill-album-art', Boolean(SettingsManager.get('ui.fillAlbumArt', false)));
  },

  applyWaveformMode() {
    const container = document.getElementById('fp-progress-container');
    const fp = document.getElementById('full-player');
    if (!container) return;

    const on = Boolean(SettingsManager.get('ui.waveformSeekbar'));
    container.classList.toggle('waveform-mode', on);
    this._waveformToken = (this._waveformToken || 0) + 1;

    if (!on) {
      const canvas = document.getElementById('waveform-canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    // Layout is already full-viewport, but defer one frame so CSS variables,
    // artwork, and accent colors have settled before measuring the canvas.
    requestAnimationFrame(() => this.renderWaveform());
    if (Player.currentTrack) this._prepareTrackWaveform(Player.currentTrack);
  },

  async _prepareTrackWaveform(track) {
    if (!track || !SettingsManager.get('ui.waveformSeekbar')) return;
    const key = String(track.id || track.path || track.title || 'current');
    const cached = this._waveformCache.get(key);
    if (cached?.length) {
      this.renderWaveform();
      return;
    }

    const token = ++this._waveformToken;
    try {
      // The waveform needs actual time-domain samples, not analyser frequency
      // bins. Decode the current audio source and reduce it to stable peak
      // values distributed across the entire track, including quiet sections.
      if (!Player.currentBlobUrl) return;
      const response = await fetch(Player.currentBlobUrl);
      const buffer = await response.arrayBuffer();
      if (token !== this._waveformToken) return;

      if (!Player.audioCtx) Player.initAudioContext();
      if (!Player.audioCtx) return;
      const audioBuffer = await Player.audioCtx.decodeAudioData(buffer.slice(0));
      if (token !== this._waveformToken) return;

      const channelCount = audioBuffer.numberOfChannels || 1;
      const channels = [];
      for (let c = 0; c < channelCount; c++) channels.push(audioBuffer.getChannelData(c));

      const bars = Math.max(48, Math.min(300, Number(SettingsManager.get('ui.waveformBars')) || 120));
      const samplesPerBar = Math.max(1, Math.floor(audioBuffer.length / bars));
      const peaks = new Float32Array(bars);
      const rms = new Float32Array(bars);

      for (let i = 0; i < bars; i++) {
        const start = i * samplesPerBar;
        const end = i === bars - 1 ? audioBuffer.length : Math.min(audioBuffer.length, start + samplesPerBar);
        let peak = 0;
        let energy = 0;
        // Sample the block at a bounded density so very long tracks do not
        // freeze the UI while still preserving clear climaxes/rests.
        const stride = Math.max(1, Math.floor((end - start) / 240));
        let count = 0;
        for (let n = start; n < end; n += stride) {
          let sample = 0;
          for (const data of channels) sample += Math.abs(data[n] || 0);
          sample /= channelCount;
          peak = Math.max(peak, sample);
          energy += sample * sample;
          count++;
        }
        peaks[i] = peak;
        rms[i] = count ? Math.sqrt(energy / count) : peak;
      }

      // A small temporal normalization keeps quiet tracks visible without
      // erasing their relative dynamics. Peaks remain the dominant signal.
      let maxPeak = 0;
      for (const v of peaks) maxPeak = Math.max(maxPeak, v);
      if (maxPeak > 0) {
        for (let i = 0; i < peaks.length; i++) {
          const normalized = peaks[i] / maxPeak;
          const floor = Math.min(0.055, Math.max(0.018, rms[i] / maxPeak * 0.35));
          peaks[i] = Math.max(floor, Math.pow(normalized, 0.72));
        }
      }

      this._waveformCache.set(key, peaks);
      // Keep memory bounded when users play through a very large library.
      while (this._waveformCache.size > 12) {
        const first = this._waveformCache.keys().next().value;
        this._waveformCache.delete(first);
      }
      this.renderWaveform();
    } catch (e) {
      // Waveform extraction is visual enhancement only. Keep the normal
      // seekbar available when a browser cannot decode the source.
      console.warn('Waveform extraction failed:', e);
      this.renderWaveform();
    }
  },

  renderWaveform() {
    const canvas = document.getElementById('waveform-canvas');
    const container = document.getElementById('fp-progress-container');
    if (!canvas || !container || !container.classList.contains('waveform-mode')) return;

    const rect = container.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    if (width < 24 || height < 16) return;

    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
    const pixelWidth = Math.max(1, Math.round(width * dpr));
    const pixelHeight = Math.max(1, Math.round(height * dpr));
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const track = Player.currentTrack;
    const key = String(track?.id || track?.path || track?.title || 'current');
    const peaks = this._waveformCache.get(key);
    if (!peaks || !peaks.length) return;

    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#d4af37';
    const duration = Number(Player.audio?.duration);
    const progress = duration > 0 && Number.isFinite(Player.audio?.currentTime)
      ? Math.max(0, Math.min(1, Player.audio.currentTime / duration))
      : 0;

    const bars = peaks.length;
    const step = width / bars;
    const gap = Math.max(1, Math.min(2.2, step * 0.28));
    const center = height / 2;
    const minBar = Math.max(2, height * 0.07);
    const maxBar = height * 0.90;
    const playedIndex = progress * bars;

    // Rounded vertical bars closely mimic Namida's waveform-seekbar idea:
    // the actual track envelope is persistent, while played/unplayed regions
    // use the current accent color with different opacity.
    for (let i = 0; i < bars; i++) {
      const amount = Math.max(0, Math.min(1, peaks[i]));
      const barHeight = Math.max(minBar, amount * maxBar);
      const x = i * step + gap / 2;
      const y = center - barHeight / 2;
      const w = Math.max(1, step - gap);
      ctx.fillStyle = accent;
      ctx.globalAlpha = i < playedIndex ? 0.98 : 0.23;
      const r = Math.min(w / 2, 2.5);
      ctx.beginPath();
      ctx.roundRect(x, y, w, barHeight, r);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // A slim accent marker makes the current position unmistakable without
    // turning the waveform into a conventional line seekbar.
    const markerX = Math.min(width - 1, Math.max(0, progress * width));
    ctx.fillStyle = accent;
    ctx.globalAlpha = 1;
    ctx.fillRect(markerX, 0, Math.max(2, dpr), height);
  },

  async renderSidebarPlaylists() {
    const playlists = await Data.getPlaylists();
    const container = document.getElementById('user-playlists');
    const userPls = playlists.filter(p => p.type === 'user');
    container.innerHTML = userPls.map(p => `
      <a href="#playlist-${p.id}" class="playlist-link" onclick="event.preventDefault(); UI.navigate('playlist-detail', {playlistId: '${p.id}'})">
        ${appIcon('playlists')}
        <span>${Utils.escapeHtml(p.name)}</span>
      </a>
    `).join('');
  },

  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebar-overlay').classList.toggle('active');
  },

  shareTrack() {
    const track = Player.currentTrack;
    if (!track) return;
    if (navigator.share) {
      navigator.share({ title: track.title, text: `${track.artist} - ${track.title}` });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${track.artist} - ${track.title}`);
    }
  },

  clearSelection() {
    this.isSelectionMode = false;
    this.selectedTracks.clear();
    this.renderCurrentPage();
  },

  sortTracks(field) {
    const safeField = ['title','artist','album','duration','playCount','dateAdded'].includes(field) ? field : 'title';
    const currentDir = this.currentPageParams?.sortDir || this.currentSortDir || 'asc';
    this.currentSortBy = safeField;
    this.currentSortDir = currentDir;
    this.navigate('tracks', { ...(this.currentPageParams || {}), sortBy: safeField, sortDir: currentDir });
  },

  filterTracks(tracks, params) {
    if (params.artist) return tracks.filter(t => t.artist === params.artist);
    if (params.album) return tracks.filter(t => t.album === params.album);
    if (params.genre) return tracks.filter(t => t.genre === params.genre);
    if (params.folder) return tracks.filter(t => t.folder === params.folder);
    if (params.favorite) return tracks.filter(t => t.favorite);
    return tracks;
  },

  async getFilteredTracks(params) {
    const tracks = await Data.getTracks();
    return this.filterTracks(tracks, params);
  },

  getSortedTracks(tracks, sortBy = 'title', sortDir = 'asc') {
    const dir = sortDir === 'desc' ? -1 : 1;
    const list = Array.isArray(tracks) ? [...tracks] : [];
    const collator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true });
    const value = (t, key) => {
      switch (key) {
        case 'duration': return Number(t?.duration) || 0;
        case 'playCount': return Number(t?.playCount) || 0;
        case 'dateAdded': return Number(t?.dateAdded) || 0;
        case 'artist': return String(t?.artist || '');
        case 'album': return String(t?.album || '');
        case 'title':
        default: return String(t?.title || '');
      }
    };
    return list
      .map((track, index) => ({ track, index }))
      .sort((a, b) => {
        const av = value(a.track, sortBy);
        const bv = value(b.track, sortBy);
        let cmp = (typeof av === 'number' && typeof bv === 'number') ? av - bv : collator.compare(av, bv);
        if (cmp === 0 && sortBy !== 'title') cmp = collator.compare(String(a.track?.title || ''), String(b.track?.title || ''));
        return cmp === 0 ? a.index - b.index : dir * cmp;
      })
      .map(item => item.track);
  },

  updateVisibleTrackRows(currentId) {
    const rows = document.querySelectorAll('.track-row[data-track-id]');
    rows.forEach(row => {
      row.classList.toggle('playing', row.dataset.trackId === String(currentId || ''));
    });
  },

  async getTracksByAlbum(album) {
    const tracks = await Data.getTracks();
    return tracks.filter(t => t.album === album.name).sort((a,b) => (a.trackNumber || 0) - (b.trackNumber || 0));
  },

  async getTracksByArtist(artist) {
    const target = String(artist?.name || '').trim().toLowerCase();
    if (!target) return [];
    const tracks = await Data.getTracks();
    return tracks.filter(t => {
      const names = [...Utils.splitArtists(t.artist || ''), ...(Array.isArray(t.featuredArtists) ? t.featuredArtists : [])];
      return names.some(n => String(n).trim().toLowerCase() === target);
    });
  },

  async getTracksByGenre(genre) {
    const tracks = await Data.getTracks();
    return tracks.filter(t => t.genre === genre.name);
  },

  async getTracksByFolder(folder) {
    const tracks = await Data.getTracks();
    return tracks.filter(t => t.folder === folder);
  },

  async getTracksByPlaylist(playlist) {
    const allTracks = await Data.getTracks();
    return playlist.tracks.map(id => allTracks.find(t => t.id === id)).filter(Boolean);
  },

  async getAutoPlaylistTracks(playlistId) {
    const tracks = await Data.getTracks();
    switch(playlistId) {
      case 'most-played': return [...tracks].sort((a,b) => (b.playCount || 0) - (a.playCount || 0)).slice(0, 50);
      case 'recently-played': return [...tracks].filter(t => t.lastPlayed).sort((a,b) => b.lastPlayed - a.lastPlayed).slice(0, 50);
      case 'never-played': return tracks.filter(t => !t.playCount);
      case 'favorites': return tracks.filter(t => t.favorite);
      case 'lost-memories': {
        const years = SettingsManager.get('smart.lostMemoriesYearsBack') || [1,2,3];
        const now = Date.now();
        return tracks.filter(t => {
          if (!t.lastPlayed) return false;
          const yearsAgo = (now - t.lastPlayed) / (365 * 24 * 60 * 60 * 1000);
          return yearsAgo >= Math.min(...years) && yearsAgo <= Math.max(...years);
        }).slice(0, 50);
      }
      default: return [];
    }
  },

  getAutoPlaylistName(id) {
    const names = {
      'most-played': 'Most Played',
      'recently-played': 'Recently Played',
      'never-played': 'Never Played',
      'favorites': 'Favorites',
      'lost-memories': 'Lost Memories'
    };
    return names[id] || id;
  },

  getAutoPlaylistArtwork(id, tracks) {
    if (tracks && tracks.length > 0) {
      const track = tracks.find(t => t.artwork) || tracks[0];
      return `<img src="${this.getArtworkUrl(track)}" alt="">`;
    }
    return `<div class="playlist-empty">${appIcon('playlists')}</div>`;
  },

  getMood(energy) {
    if (energy > 0.8) return 'Energetic';
    if (energy > 0.6) return 'Upbeat';
    if (energy > 0.4) return 'Balanced';
    if (energy > 0.2) return 'Chill';
    return 'Calm';
  },

  getEra(year) {
    if (!year) return 'Unknown';
    if (year >= 2020) return '2020s';
    if (year >= 2010) return '2010s';
    if (year >= 2000) return '2000s';
    if (year >= 1990) return '90s';
    if (year >= 1980) return '80s';
    if (year >= 1970) return '70s';
    return 'Classic';
  },

  getTrackMood(track) {
    const energy = track.energy || 0.5;
    return this.getMood(energy);
  },

  getTrackEra(track) {
    return this.getEra(track.year);
  },

  getAlbumArtwork(album, tracks) {
    if (tracks && tracks.length > 0) {
      const track = tracks.find(t => t.artwork) || tracks[0];
      return `<img src="${this.getArtworkUrl(track)}" alt="">`;
    }
    return `<div class="playlist-empty">${appIcon('albums')}</div>`;
  },

  getArtistArtwork(artist, tracks) {
    if (tracks && tracks.length > 0) {
      const track = tracks.find(t => t.artwork) || tracks[0];
      return `<img src="${this.getArtworkUrl(track)}" alt="">`;
    }
    return `<div class="playlist-empty">${appIcon('artists')}</div>`;
  },

  getGenreArtwork(genre) {
    return `<div class="playlist-empty"><span style="font-size:24px;font-weight:900;color:var(--accent);">${genre.name[0]}</span></div>`;
  },

  getFolderArtwork(folder, tracks) {
    if (tracks && tracks.length > 0) {
      const track = tracks.find(t => t.artwork) || tracks[0];
      return `<img src="${this.getArtworkUrl(track)}" alt="">`;
    }
    return `<div class="playlist-empty">${appIcon('folders')}</div>`;
  },

  getPlaylistArtwork(playlist, tracks) {
    if (playlist.type === 'auto') {
      return this.getAutoPlaylistArtwork(playlist.id, tracks);
    }
    if (tracks && tracks.length > 0) {
      const track = tracks.find(t => t.artwork) || tracks[0];
      return `<img src="${this.getArtworkUrl(track)}" alt="">`;
    }
    return `<div class="playlist-empty">${appIcon('playlists')}</div>`;
  },

  async sortPlaylist(id) {
    const pl = await Data.getPlaylist(id);
    if (!pl) return;
    const tracks = await this.getTracksByPlaylist(pl);
    const mode = prompt('Sort by: title, artist, album, duration', 'title');
    if (!mode) return;
    const key = ['title','artist','album','duration'].includes(mode.toLowerCase()) ? mode.toLowerCase() : 'title';
    tracks.sort((a,b) => key === 'duration' ? (a.duration||0)-(b.duration||0) : String(a[key]||'').localeCompare(String(b[key]||'')));
    pl.tracks = tracks.map(t => t.id);
    await Data.updatePlaylist(pl);
    this.renderCurrentPage();
    this.showToast('Playlist sorted.');
  },

  async removeArtistsFromPlaylist(id) {
    const pl = await Data.getPlaylist(id);
    if (!pl) return;
    const artists = prompt('Artists to remove (comma-separated):', '');
    if (!artists) return;
    const names = artists.split(',').map(v => v.trim().toLowerCase()).filter(Boolean);
    const tracks = await this.getTracksByPlaylist(pl);
    pl.tracks = tracks.filter(t => !names.includes(String(t.artist||'').toLowerCase())).map(t => t.id);
    await Data.updatePlaylist(pl);
    this.renderCurrentPage();
    this.showToast('Artists removed from playlist.');
  },

  shufflePlaylist(id) {
    Data.getPlaylist(id).then(pl => {
      if (!pl) return;
      this.getTracksByPlaylist(pl).then(tracks => {
        const shuffled = [...tracks].sort(() => Math.random() - 0.5);
        Player.setQueue(shuffled, 0);
        Player.play();
      });
    });
  },

  shuffleAlbum(id) {
    Data.getAll('albums').then(albums => {
      const album = [...albums].find(a => a.id === id);
      if (!album) return;
      this.getTracksByAlbum(album).then(tracks => {
        const shuffled = [...tracks].sort(() => Math.random() - 0.5);
        Player.setQueue(shuffled, 0);
        Player.play();
      });
    });
  },

  shuffleArtist(name) {
    this.getTracksByArtist({ name }).then(tracks => {
      const shuffled = [...tracks].sort(() => Math.random() - 0.5);
      Player.setQueue(shuffled, 0);
      Player.play();
    });
  },

  toggleTrackSelection(id) {
    if (this.selectedTracks.has(id)) {
      this.selectedTracks.delete(id);
      if (this.selectedTracks.size === 0) this.isSelectionMode = false;
    } else {
      this.selectedTracks.add(id);
    }
    this.renderCurrentPage();
  },
};
