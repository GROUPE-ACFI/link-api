import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './contact.entity';
import { CreateContactDto } from './create-contact.dto';
import { UpdateContactDto } from './update-contact.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  findAll(): Promise<Contact[]> {
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Contact | null> {
    return this.contactService.findOne(id);
  }

  @Post()
  create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactService.create(createContactDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<Contact | null> {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.contactService.remove(id);
  }
}
