import React, { useEffect, useState } from "react";
import axios from "axios";
import {  Container,  Flex,  Box,  Heading,  Button,  Wrap,  FormControl,  FormLabel,  Input,  Textarea,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToast } from "@chakra-ui/react";
import { htmlToText } from "html-to-text";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct, searchData } from "../Redux/AppReducer/action";
import {modules} from '../Assest/Module'
import {formats} from '../Assest/Module'

const Products = () => {
  const {data,faqs,ProductId,description} = useSelector(store=>store.AppReducer)
  // console.log(ProductId,description,faqs,data)
  const toast = useToast();
  const [details, setDetails] = useState(data||null);
  const [query, setQuery] = useState("");
  const [queryType, setqueryType] = useState("");
  const [ProdID, setProdID] = useState("");
  const [ID, setID] = useState("");
  const [AddDetails, setAddDetails] = useState({});
  const [code, setCode] = useState(description || "");
  const [faq, setFaq] = useState([]);
  const [Newfaq, setNewFaq] = useState({ question: "", answer: "" });
  const [obj, setObj] = useState(faqs|| []);
  const [productname, setProductname] = useState("");
  const [logo,setLogo] = useState("");
  const [clickupdate,setClickupdate] = useState(false)
  const dispatch= useDispatch()
  // ###########################
  
  useEffect(()=>{
    if(data){
      if(data){
    setDetails(data)
    setFaq(faqs)
    setCode(description)
    setID(ProductId)
  }
}
},[data])

useEffect(()=>{
  if(clickupdate){
    window.location.reload(false);
    setClickupdate(false)
  }

},[clickupdate])

const handleProcedureContentChange = (content) => {  //descriopton
 setCode(content);
    setAddDetails({
      ...AddDetails,
      description: content,
    });
  };

  const handleQuery = (e) => {
    let q = e.target.value;
    q.trim().split("/")
    
    setQuery(q);
  };
  
 
  const handleSearch =() => {
    let newArr= query.trim().split("/") 
    // setqueryType(newArr[newArr.lenght-2]);
    // setProductname(newArr[newArr.length-1])
    dispatch(searchData(newArr[newArr.length-2],newArr[newArr.length-1]))
    setqueryType(newArr[newArr.length-2])
   
    }
  
  // console.log(`${queryType}/${productname}`)
  
  const handleAdd = async () => {
    console.log(AddDetails);
    try {
      if ((AddDetails == {})) {
        return toast({
          title: "Error",
          description: "Enter Valid Data",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
      dispatch(AddProduct(AddDetails))
      toast({
        title: "Sucess",
        description: "Product Added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed",
        description: "Error",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleUpdate = async () => {
    try {
      let res = await axios.patch(
        `https://thepipingmart.up.railway.app/${queryType}/${ID}`,
        AddDetails
      );
      // console.log(res);
     
      toast({
        title: "Success",
        description: "Updated Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setDetails(data||null)
      setFaq([])
      setCode("")
      setQuery("")
      setAddDetails({})
      setClickupdate(true)
    
      // alert("Updated successfully");
    } catch (err) {
      console.log(err.message);
      toast({
        title: "Error",
        description: "Updation Failed",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      // alert("Updation Failed");
    }

  };
  // #####################faq onchange function########################

  const faqOnchange = ({ name, value }, index) => {
    let x = faq.map((ele, i) => {
      if (index == i) {
        if (name == "question") {
          ele.question = value;
        } else {
          ele.answer = value;
        }
      }
      return ele;
    });
    setFaq(x);
  };

  //-----------------------------------------------------
  const handleSavefaq = () => {
    let x = faq;
    x.push(Newfaq);
    setFaq(x);
    // console.log(obj)
    setAddDetails({ ...AddDetails, faqs: faq });
    console.log(faq,x)
    setOpen(false);
    setNewFaq("")
  };

  // ----------------------------------------------------
  const handleAddnewFaq = ({ target }) => {
    setNewFaq({ ...Newfaq, [target.name]: target.value });
  };

  const handleEditFaq = () => {
    console.log(faq);
    setAddDetails({ ...AddDetails, faqs: faq });
  };

  const handleRemoveFaq = (index) => {
    let x = faq.filter((ele, i) => {
      return i != index;
    });

    setFaq(x);
    setAddDetails({ ...AddDetails, faqs: x });
  };
  const handleChange = ({ name, value }) => {
    setAddDetails({
      ...AddDetails,
      [name]: value,
    });
  };
  const handleAddFaq = () => {
    setOpen(true);
  };

  const handleChange1 = ({name,value})=>{
    console.log(name,value)
  }
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <form >
      <Container
        bg="#9DC4FB"
        maxW="full"
        mt={0}
        centerContent
        overflow="hidden"
      >
        <Flex>
          <Box
            color="black"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
          >
            <Heading>Products</Heading>
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <Box>
                  <Box
                    rounded={"lg"}
                    boxShadow={"lg"}
                    p={8}
                    display="flex"
                    justifyContent="center"
                  >
                    <Flex
                      spacing={4}
                      p={8}
                      textAlign="center"
                      flexDirection="column"
                      boxShadow="lg"
                      bg="white"
                      borderRadius="lg"
                    >
                      <Box
                        margin="auto"
                        display="flex"
                        alignItems="flex-end"
                        gap="10px"
                      >
                        <FormControl id="ProductName" w="500px">
                          <FormLabel textAlign="center">Product URL</FormLabel>
                          <Input
                            type="text"
                            boxShadow="lg"
                            value={query}
                            onChange={(e) => handleQuery(e)}
                          />
                        </FormControl>
                        <Button onClick={handleSearch}>Search</Button>
                      </Box>
                      <Flex gap={5} flexWrap="wrap" p={8}>
                        <Box>
                          <FormControl id="ProductName" w="300px">
                            <FormLabel>Product Name</FormLabel>
                            <Input
                              name="displayName"
                              type="text"
                              defaultValue={
                                details && details.displayName !== ""
                                  ? details.displayName
                                  : ""
                              }
                              onChange={({ target }) => handleChange(target)}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="url" w="300px">
                            <FormLabel>URL</FormLabel>
                            <Input
                              name="url"
                              type="text"
                              defaultValue={
                                details && details.url !== "" ? details.url : ""
                              }
                              onChange={({ target }) => handleChange(target)}
                            />
                          </FormControl>
                        </Box>

                        <Box>
                          <FormControl id="h1" w="300px" hidden={true}>
                            <FormLabel>Upload logo </FormLabel>
                            <Input
                              name="logo"
                              type="file"
                              defaultValue={
                                details && details.logo !== ""
                                  ? details.logo
                                  : ""
                              }
                              onChange={({ target }) => handleChange1(target)}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="keywords" w={900}>
                            <FormLabel>Keywords</FormLabel>
                            <Textarea
                              name="keywords"
                              defaultValue={
                                details && details.keywords !== ""
                                  ? details.keywords
                                  : ""
                              }
                              onChange={({ target }) => handleChange(target)}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="title" w={480}>
                            <FormLabel>Title</FormLabel>
                            <Textarea
                              name="title"
                              defaultValue={
                                details && details.title !== ""
                                  ? details.title
                                  : ""
                              }
                              onChange={({ target }) => handleChange(target)}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="Meta" w={480}>
                            <FormLabel>Meta</FormLabel>
                            <Textarea
                              name="meta"
                              defaultValue={
                                details && details.meta != ""
                                  ? details.meta
                                  : ""
                              }
                              onChange={({ target }) => handleChange(target)}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="description">
                            <FormLabel>Description</FormLabel>
                            <Box w="1000px" h="auto" overflow="hidden">
                              <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                value={code}
                                onChange={handleProcedureContentChange}
                              />
                            </Box>
                          </FormControl>
                        </Box>
                        <Box>

                          <FormControl id="faq" width="800px">
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                margin: "20px",
                              }}
                            >
                              <FormLabel>FAQ's</FormLabel>
                            </Box>

                            {faq &&
                              faq.length &&
                              faq.map((item, key) => (
                                <Box key={key}>
                                  <Box
                                    mb="50px"
                                    display="flex"
                                    flexDirection="column"
                                  >
                                    <Input
                                      name="question"
                                      type="text"
                                      // key={key}
                                      value={item?.question}
                                      onChange={({ target }) =>
                                        faqOnchange(target, key)
                                      }
                                    />
                                    <Textarea
                                      // key={key}
                                      name="answer"
                                      value={htmlToText(item?.answer) || ""}
                                      onChange={({ target }) =>
                                        faqOnchange(target, key)
                                      }
                                   />
                                   
                                    <Box mt="20px">
                                      <Button
                                        width="20%"
                                        size="sm"
                                        bg={"blue.400"}
                                        color={"white"}
                                        _hover={{
                                          bg: "blue.500",
                                        }}
                                        onClick={() => handleEditFaq(key)}
                                      >
                                        Edit FAQ
                                      </Button>
                                      <Button
                                        ml="20px"
                                        width="20%"
                                        size="sm"
                                        bg={"red.400"}
                                        color={"white"}
                                        _hover={{
                                          bg: "red.500",
                                        }}
                                        onClick={() => handleRemoveFaq(key)}
                                      >
                                        Remove
                                      </Button>
                                    </Box>
                                  </Box>
                                </Box>
                              ))}

                            {open && (
                              <>
                                <Input
                                  type="text"
                                  name="question"
                                  defaultValue=""
                                  onChange={handleAddnewFaq}
                                />
                                <Box>
                                  <Textarea
                                    name="answer"
                                    onChange={handleAddnewFaq}
                                    value={Newfaq?.answer}
                                  />
                                  
                                </Box>
                                <Box
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    margin: "20px",
                                  }}
                                >
                                  <Button
                                    width="20%"
                                    size="sm"
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                      bg: "blue.500",
                                    }}
                                    onClick={handleSavefaq}
                                  >
                                    Save
                                  </Button>
                                </Box>
                              </>
                            )}
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                margin: "20px",
                              }}
                            >
                              <Button
                                width="20%"
                                size="sm"
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                  bg: "blue.500",
                                }}
                                onClick={handleAddFaq}
                              >
                                Add FAQ
                              </Button>
                            </Box>
                          </FormControl>
                        </Box>
                      </Flex>
                      

                      <Flex gap={5} justifyContent="center" pt="1rem">
                        {/* <Button
                          width="20%"
                          size="lg"
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                          onClick={handleAdd}
                        >
                          Add Product
                        </Button> */}
                        <Button
                          width="20%"
                          size="lg"
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                          onClick={handleUpdate}
                        >
                          Update
                        </Button>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
      </form>
    </div>
  );
};

export default Products;
