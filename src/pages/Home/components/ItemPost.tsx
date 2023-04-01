import { Text, Button, Title } from "@mantine/core";
import { Badge } from '@mantine/core';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function ItemPost() {
  return (
    <li className="list-item">
      {/* header */}
      <div className="box-flex">
        <div className="info-user">
          <Link to="/user">
            <img
              className="user-image"
              src="https://static.productionready.io/images/smiley-cyrus.jpg"
              alt="user"
            />
          </Link>
          <div className="info">
            <Text className="name">
              <Link className="Link-to" to="/user">
                Eric Simons
              </Link>
            </Text>
            <Text className="date-come">Jan 20th</Text>
          </div>
        </div>
        <div>
          <Button variant="outline" color="green" size="xs" >
            <FontAwesomeIcon icon={faHeart} /> <Text size=".875rem" ml="0.2rem">123</Text>
          </Button>
        </div>
      </div>
      <div className="Box-content">
        <Link to="/" className="Link-to" >
          <Title order={1} className="title-post" >
            If we quantify the alarm, we can get to the FTP pixel through the online SSL interface!
          </Title>
        </Link>
        <Text weight={300} size={"1rem"} color="#999" mt="0.3rem" mb="1rem">
          Omnis perspiciatis qui quia commodi sequi modi. Nostrum quam aut cupiditate est facere omnis possimus. Tenetur similique nemo illo soluta molestias facere quo. Ipsam totam facilis delectus nihil quidem soluta vel est omnis.
        </Text>
      </div>
      <div className="box-flex">
        <Link to="/red" className="Link-to link-red-more">
          Red more...
        </Link>
        <div className="list-tag">
          <Link to="/tag" className="Link-to">
            <Badge className="tag-name" ml="0.4rem" size="xs" radius="md" variant="outline">Badge</Badge>
          </Link>
          <Link to="/tag" className="Link-to">
            <Badge className="tag-name" ml="0.4rem" size="xs" radius="md" variant="outline">Badge</Badge>
          </Link>
          <Link to="/tag" className="Link-to">
            <Badge className="tag-name" ml="0.4rem" size="xs" radius="md" variant="outline">Badge</Badge>
          </Link>
          <Link to="/tag" className="Link-to">
            <Badge className="tag-name" ml="0.4rem" size="xs" radius="md" variant="outline">Badge</Badge>
          </Link>
        </div>
      </div>
    </li>
  );
}
