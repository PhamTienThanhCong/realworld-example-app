import { memo } from "react"
import { Container,Text } from "@mantine/core"
import { Link } from "react-router-dom"
import "./style.css";

function Footer(){
    return(
        <footer>
            <Container>
                <Text
                    color="#bbb"
                    size=".8rem"
                    weight={300}
                >
                    <Link to="/"
                        className="titleWeb"
                    >
                        conduit
                    </Link>
                    <span style={{ marginLeft:"10px" }}>
                        An interactive learning project from Thinkster. Code & design licensed under MIT.
                    </span>
                </Text>
            </Container>
        </footer>
    )
}

export default memo(Footer)