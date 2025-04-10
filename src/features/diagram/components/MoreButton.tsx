import { Button } from "@/components/ui/button";
import moreIcon from "@/assets/icons/more.svg";

export const MoreButton = () => {
	return (
		<Button
			type="button"
			size="icon"
			variant="ghost"
			className="cursor-pointer"
		>
			<img src={moreIcon} alt="More Icon" />
		</Button>
	);
};
