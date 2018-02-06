// Red, Green, & Blue are each represented by 8 bits. 2^8 = 256 or from
// range of 0 to 255.
// The human eye has about 6 million cones 64% red, 32% green, and 2% blue.
// Darkest Grey(Black) to lighest Grey(White)
export const GREY_0 = 'rgb(255, 255, 255)';
export const GREY_1 = 'rgb(229, 229, 229)';
export const GREY_2 = 'rgb(204, 204, 204)';
export const GREY_3 = 'rgb(178, 178, 178)';
export const GREY_4 = 'rgb(153, 153, 153)';
export const GREY_5 = 'rgb(127, 127, 127)';
export const GREY_6 = 'rgb(102, 102, 102)';
export const GREY_7 = 'rgb(76, 76, 76)';
export const GREY_8 = 'rgb(51, 51, 51)';
export const GREY_9 = 'rgb(25, 25, 25)';
export const GREY_10 = 'rgb(0, 0, 0)';

//                       rgb(R  , G  , B)
// If you decrease B yellow becomes darker.
// After B is 0, then if you increase R & G the same the yellow becomes darker
export const YELLOW_1 = 'rgb(247, 247, 0)';
export const YELLOW_2 = 'rgb(220, 220, 0)'; // - 27 Red and Green
export const YELLOW_3 = 'rgb(192, 192, 0)'; // - 27 over and over
export const YELLOW_4 = 'rgb(165, 165, 0)';
export const YELLOW_5 = 'rgb(137, 137, 0)';
export const YELLOW_6 = 'rgb(110, 110, 0)';
export const YELLOW_7 = 'rgb(82, 82, 0)';
export const YELLOW_8 = 'rgb(55, 55, 0)';
export const YELLOW_9 = 'rgb(27, 27, 0)';

//                       rgb(R  , G  , B)
// If you decrease R and increase B yellow-green becomes darker.
// After B is 0, then if you decrease R & G the same the yellow-green becomes darker
export const YELLOW_GREEN_1 = 'rgb(199, 255, 84)';
export const YELLOW_GREEN_2 = 'rgb(160, 238, 0)'; // previous G-17
export const YELLOW_GREEN_3 = 'rgb(141, 209, 0)'; // previous R-19, G-19
export const YELLOW_GREEN_4 = 'rgb(120, 177, 0)'; // previous R-21, G-32
export const YELLOW_GREEN_5 = 'rgb(100, 148, 0)'; // previous R-20, G-29
export const YELLOW_GREEN_6 = 'rgb(80, 119, 0)'; // previous R-20, G-29
export const YELLOW_GREEN_7 = 'rgb(60, 89, 0)'; // previous R-20, G-30
export const YELLOW_GREEN_8 = 'rgb(40, 60, 0)'; // previous R-20, G-29
export const YELLOW_GREEN_9 = 'rgb(20, 29, 0)'; // previous R-20, G-31

//                       rgb(R  , G  , B)
// If you decrease R & B green becomes darker.
// After R & B are 0, then if you decrease G the green becomes darker
export const GREEN_1 = 'rgb(165, 255, 165)';
export const GREEN_2 = 'rgb(79, 255, 79)'; // R-86, B-86
export const GREEN_3 = 'rgb(0, 247, 0)';
export const GREEN_4 = 'rgb(0, 212, 0)'; // G-35
export const GREEN_5 = 'rgb(0, 176, 0)'; // G-35
export const GREEN_6 = 'rgb(0, 142, 0)'; // G-33
export const GREEN_7 = 'rgb(0, 108, 0)';
export const GREEN_8 = 'rgb(0, 73, 0)';
export const GREEN_9 = 'rgb(0, 35, 0)';

export const BLUE_GREEN_1 = 'rgb(170, 242, 255)';
export const BLUE_GREEN_2 = 'rgb(0, 250, 250)';
export const BLUE_GREEN_3 = 'rgb(0, 218, 218)';
export const BLUE_GREEN_4 = 'rgb(0, 188, 188)';
export const BLUE_GREEN_5 = 'rgb(0, 158, 158)';
export const BLUE_GREEN_6 = 'rgb(0, 126, 126)';
export const BLUE_GREEN_7 = 'rgb(0, 95, 95)';
export const BLUE_GREEN_8 = 'rgb(0, 65, 65)';
export const BLUE_GREEN_9 = 'rgb(0, 35, 35)';

export const BLUE_1 = 'rgb(209, 233, 255)';
export const BLUE_2 = 'rgb(168, 214, 255)';
export const BLUE_3 = 'rgb(117, 190, 245)';
export const BLUE_4 = 'rgb(66, 166, 255)';
export const BLUE_5 = 'rgb(20, 145, 255)';
export const BLUE_6 = 'rgb(0, 115, 215)';
export const BLUE_7 = 'rgb(0, 89, 168)';
export const BLUE_8 = 'rgb(0, 61, 114)';
export const BLUE_9 = 'rgb(0, 31, 58)';

export const BLUE_VIOLET_1 = 'rgb(235, 221, 255)';
export const BLUE_VIOLET_2 = 'rgb(218, 193, 255)';
export const BLUE_VIOLET_3 = 'rgb(201, 165, 255)';
export const BLUE_VIOLET_4 = 'rgb(181, 132, 255)';
export const BLUE_VIOLET_5 = 'rgb(161, 102, 255)';
export const BLUE_VIOLET_6 = 'rgb(143, 68, 255)';
export const BLUE_VIOLET_7 = 'rgb(123, 35, 255)';
export const BLUE_VIOLET_8 = 'rgb(102, 0, 255)';
export const BLUE_VIOLET_9 = 'rgb(60, 0, 150)';

export const VIOLET_1 = 'rgb(255, 220, 255)';
export const VIOLET_2 = 'rgb(255, 185, 255)';
export const VIOLET_3 = 'rgb(255, 145, 255)';
export const VIOLET_4 = 'rgb(255, 108, 255)';
export const VIOLET_5 = 'rgb(255, 70, 255)';
export const VIOLET_6 = 'rgb(255, 27, 255)';
export const VIOLET_7 = 'rgb(222, 0, 222)';
export const VIOLET_8 = 'rgb(165, 0, 165)';
export const VIOLET_9 = 'rgb(100, 0, 100)';

export const RED_VIOLET_1 = 'rgb(255, 219, 235)';
export const RED_VIOLET_2 = 'rgb(255, 186, 218)';
export const RED_VIOLET_3 = 'rgb(255, 150, 199)';
export const RED_VIOLET_4 = 'rgb(255, 119, 182)';
export const RED_VIOLET_5 = 'rgb(255, 81, 162)';
export const RED_VIOLET_6 = 'rgb(255, 45, 143)';
export const RED_VIOLET_7 = 'rgb(222, 15, 127)';
export const RED_VIOLET_8 = 'rgb(193, 0, 90)';
export const RED_VIOLET_9 = 'rgb(114, 0, 53)';

export const RED_1 = 'rgb(255, 222, 222)';
export const RED_2 = 'rgb(255, 190, 190)';
export const RED_3 = 'rgb(255, 155, 155)';
export const RED_4 = 'rgb(255, 125, 125)';
export const RED_5 = 'rgb(255, 90, 90)';
export const RED_6 = 'rgb(255, 55, 55)';
export const RED_7 = 'rgb(255, 15, 15)';
export const RED_8 = 'rgb(215, 0, 0)';
export const RED_9 = 'rgb(124, 0, 0)';

export const RED_ORANGE_1 = 'rgb(255, 221, 214)';
export const RED_ORANGE_2 = 'rgb(255, 192, 178)';
export const RED_ORANGE_3 = 'rgb(255, 157, 135)';
export const RED_ORANGE_4 = 'rgb(255, 125, 96)';
export const RED_ORANGE_5 = 'rgb(255, 94, 58)';
export const RED_ORANGE_6 = 'rgb(255, 61, 17)';
export const RED_ORANGE_7 = 'rgb(211, 38, 0)';
export const RED_ORANGE_8 = 'rgb(137, 25, 0)';
export const RED_ORANGE_9 = 'rgb(71, 13, 0)';

export const ORANGE_1 = 'rgb(255, 220, 196)';
export const ORANGE_2 = 'rgb(255, 192, 147)';
export const ORANGE_3 = 'rgb(255, 164, 99)';
export const ORANGE_4 = 'rgb(255, 133, 45)';
export const ORANGE_5 = 'rgb(244, 102, 0)';
export const ORANGE_6 = 'rgb(198, 82, 0)';
export const ORANGE_7 = 'rgb(150, 62, 0)';
export const ORANGE_8 = 'rgb(99, 41, 0)';
export const ORANGE_9 = 'rgb(51, 21, 0)';

//export const BLUE_GREEN_5 = 'rgb(0, 160, 160)';
//export const BLUE_5 = 'rgb(0, 156, 213)';
//export const BLUE_VIOLET_5 = 'rgb(133, 114, 255)';
//export const VIOLET_5 = 'rgb(181, 98, 254)';
//export const RED_VIOLET_5 = 'rgb(255, 84, 173)';
//export const RED_5 = 'rgb(255, 94, 94)';
//export const RED_ORANGE_5 = 'rgb(255, 97, 37)';
//export const ORANGE_5 = 'rgb(218, 113, 0)';
export const ORANGE_YELLOW_5 = 'rgb(162, 129, 0)';

export const colorsHashtable5 = [
	{
		key: YELLOW_5,
		keyCompliment1: RED_VIOLET_5,
		keyCompliment2: BLUE_VIOLET_5,
		thirdColor: BLUE_5
	},
	{
		key: YELLOW_GREEN_5,
		keyCompliment1: RED_5,
		keyCompliment2: YELLOW_GREEN_5,
		thirdColor: BLUE_VIOLET_5
	},
	{
		key: GREEN_5,
		keyCompliment1: RED_ORANGE_5,
		keyCompliment2: RED_VIOLET_5,
		thirdColor: VIOLET_5
	},
	{
		key: BLUE_GREEN_5,
		keyCompliment1: ORANGE_5,
		keyCompliment2: RED_5,
		thirdColor: RED_VIOLET_5
	},
	{
		key: BLUE_5,
		keyCompliment1: ORANGE_YELLOW_5,
		keyCompliment2: RED_ORANGE_5,
		thirdColor: RED_5
	},
	{
		key: BLUE_VIOLET_5,
		keyCompliment1: YELLOW_5,
		keyCompliment2: ORANGE_5,
		thirdColor: RED_ORANGE_5
	},
	{
		key: VIOLET_5,
		keyCompliment1: YELLOW_GREEN_5,
		keyCompliment2: ORANGE_YELLOW_5,
		thirdColor: ORANGE_5
	},
	{
		key: RED_VIOLET_5,
		keyCompliment1: GREEN_5,
		keyCompliment2: YELLOW_5,
		thirdColor: ORANGE_YELLOW_5
	},
	{
		key: RED_5,
		keyCompliment1: BLUE_GREEN_5,
		keyCompliment2: YELLOW_GREEN_5,
		thirdColor: YELLOW_5
	},
	{
		key: RED_ORANGE_5,
		keyCompliment1: BLUE_5,
		keyCompliment2: GREEN_5,
		thirdColor: YELLOW_GREEN_5
	},
	{
		key: ORANGE_5,
		keyCompliment1: BLUE_VIOLET_5,
		keyCompliment2: BLUE_GREEN_5,
		thirdColor: GREEN_5
	},
	{
		key: ORANGE_YELLOW_5,
		keyCompliment1: VIOLET_5,
		keyCompliment2: BLUE_5,
		thirdColor: BLUE_GREEN_5
	}
];
