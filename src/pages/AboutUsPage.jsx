import React from "react";
import Header from "../components/Header";
import RelayImg from "../assets/relay.jpeg";
import CodingImg from "../assets/coding.jpeg";
import GlobalConnection from "../assets/global-connection.jpeg";
import { Flex, Image, Heading, Text, Button, Divider } from "@chakra-ui/react";

export default function AboutUsPage() {

    return (
        <Flex direction='column'>
            <Header />
            <Flex direction='column' align='center' pb='20px' pt='10px'>
                <Image src={RelayImg} alt='Relay Image' width='40%' pb='10px'/>
                <Heading size={['lg', 'xl']}pb='5px'>Grow your portfolio with Repo Relay</Heading>
                <Text pb='10px'>Share your unfinished coding projects with the community, or contribute to existing ones</Text>
                <Button colorScheme='teal' fontWeight='bold'>JOIN NOW</Button>
            </Flex>
            <Divider alignSelf='center' width='90%'/>
            <Flex justify='center' gap='20px' pt='20px' pb='20px'>
                <Flex direction='column' width='40%'>
                    <Heading size={['md', 'lg']} align='left'>Advance and expand your skillset</Heading>
                    <Text align='left'>
                        Build on your existing skills by taking on new projects with familiar technologies, or challenge yourself by trying something new.
                    </Text>
                </Flex>
                <Image src={CodingImg} alt='Coding' width='40%' />
            </Flex>
            <Divider alignSelf='center' width='90%'/>
            <Flex justify='center' gap='20px' pt='20px' pb='20px'>
                <Image src={GlobalConnection} alt='Global Connection' width='40%' />
                <Flex direction='column' width='40%'>
                    <Heading size={['md', 'lg']} align='left'>Collaborate with a diverse, global coding community</Heading>
                    <Text align='left'>
                        Get access to an active community of developers of all skill levels and backgrounds.
                    </Text>
                </Flex>
            </Flex>


        </Flex>
      </Flex>
    </Flex>
  );
}
