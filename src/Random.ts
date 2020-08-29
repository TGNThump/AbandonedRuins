function int(from: number, to: number): number {
	return from + Math.floor(((to-from+1) * Math.random()));
}

function float(from: number = 0, to: number = 1): number {
	return from + ((to - from) * Math.random());
}

function of<T>(arr: Array<T>): T | null {
	return (arr.length > 0) ? arr[int(0, arr.length - 1)] : null;
}

export default {
	int,
	float,
	of
}