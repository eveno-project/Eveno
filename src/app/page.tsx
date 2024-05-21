import Button from "@components/button/button";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { Color } from "@common/constants/color";

export default function Home() {
  return (
    <main>
      <Button color="secondary" type="button">
        <ArrowDropDownRoundedIcon htmlColor={Color.BLACK} sx={{ fontSize: 32 }} />
        <span>Test</span>
      </Button>
    </main>
  );
}
