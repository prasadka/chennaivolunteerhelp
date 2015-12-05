namespace App {
	export enum Origin {
		REQUEST,
		OFFER
	}
	
	export enum Type {
		TRANSPORT,
		FOOD,
		SHELTER
	}

	export interface Aid {
		origin: Origin,
		type: Type,
		address: string,
		subtypes: string[],
		phone: string
	}
	
	export function getIcon(type: Type): string {
		switch (type) {
			case Type.FOOD:
				return "resources/restaurant-18.svg";
			case Type.SHELTER:
				return "resources/lodging-18.svg";
			case Type.TRANSPORT:
				return "resources/bus-18.svg";
		}
	}
}
